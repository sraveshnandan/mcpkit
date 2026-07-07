import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();
const workspaceRoot = fileURLToPath(new URL('../..', import.meta.url));

const isGithubPages = process.env.GITHUB_PAGES === 'true';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';

// With a custom domain (mcpkit.js.org) no basePath is needed.
// Without a custom domain the site lives under /mcpkt/ (GitHub Pages project site).
const repoName = 'mcpkit';
const basePath = isGithubPages && !isCustomDomain ? `/${repoName}` : '';

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  output: isGithubPages ? 'export' : undefined,
  trailingSlash: isGithubPages && !isCustomDomain,
  images: {
    unoptimized: isGithubPages,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  turbopack: {
    root: path.resolve(workspaceRoot),
  },
};

export default withMDX(config);
