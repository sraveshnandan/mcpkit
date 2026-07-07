// @ts-nocheck
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createSearchAPI } from 'fumadocs-core/search/server';

import { docs } from '../.source/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const appRoot = path.resolve(__dirname, '..');
const publicDir = path.join(appRoot, 'public');
const outputPath = path.join(publicDir, 'search-index.json');

function stripQuotes(value: string): string {
  return value.trim().replace(/^['"]|['"]$/g, '');
}

function extractFrontmatter(content: string): { title?: string; description?: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const lines = match[1].split('\n');
  const result: { title?: string; description?: string } = {};

  for (const line of lines) {
    const titleMatch = line.match(/^title:\s*(.+)$/);
    if (titleMatch) result.title = stripQuotes(titleMatch[1]);

    const descriptionMatch = line.match(/^description:\s*(.+)$/);
    if (descriptionMatch) result.description = stripQuotes(descriptionMatch[1]);
  }

  return result;
}

function stripFrontmatter(content: string): string {
  return content.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
}

function toUrl(filePath: string): string {
  const withoutExt = filePath.replace(/\.mdx$/, '');
  if (withoutExt === 'index') return '/docs';
  if (withoutExt.endsWith('/index')) return `/docs/${withoutExt.slice(0, -'/index'.length)}`;
  return `/docs/${withoutExt}`;
}

function toBreadcrumbs(filePath: string): string[] {
  return filePath
    .replace(/\.mdx$/, '')
    .split('/')
    .filter((segment) => segment !== 'index')
    .map((segment) => segment.replace(/-/g, ' '));
}

function toFallbackTitle(filePath: string): string {
  const segments = filePath.replace(/\.mdx$/, '').split('/').filter(Boolean);
  const last = segments[segments.length - 1] ?? 'docs';
  const label = last === 'index' ? segments[segments.length - 2] ?? 'docs' : last;

  return label
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function main() {
  const source = docs.toFumadocsSource();
  const files = source.files.filter((file) => file.type === 'page');

  const indexes = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(appRoot, file.absolutePath), 'utf8');
      const frontmatter = extractFrontmatter(raw);
      const markdown = stripFrontmatter(raw);
      const title = frontmatter.title ?? toFallbackTitle(file.path);
      const description = frontmatter.description;
      const url = toUrl(file.path);
      const breadcrumbs = toBreadcrumbs(file.path);

      return {
        title,
        description,
        breadcrumbs,
        content: markdown,
        url,
        keywords: `${title} ${breadcrumbs.join(' ')}`.trim(),
      };
    })
  );

  const search = createSearchAPI('simple', {
    indexes,
    language: 'english',
  });

  const response = await search.staticGET();
  const body = await response.text();

  await fs.mkdir(publicDir, { recursive: true });
  await fs.writeFile(outputPath, body, 'utf8');

  console.log(`Generated static search index at ${outputPath}`);
}

await main();
