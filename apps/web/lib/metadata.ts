import type { Metadata } from 'next';

import { basePath, repoName, repoOwner, siteUrl } from '@/lib/runtime-config';

export { siteUrl };
export const siteName = 'mcpkit';
export const siteDescription =
  'The create-next-app for MCP servers. Build, validate, test, diagnose, document, and ship Model Context Protocol servers with one coherent toolkit.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — The create-next-app for MCP servers`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'mcpkit',
    'mcpkit-cli',
    'MCP server',
    'Model Context Protocol',
    'create MCP server',
    'MCP CLI',
    'test MCP server',
    'build MCP server',
  ],
  authors: [{ name: repoOwner, url: `https://github.com/${repoOwner}` }],
  creator: repoOwner,
  publisher: repoOwner,
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: `${basePath}/favicon.svg`,
    shortcut: `${basePath}/favicon.svg`,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${siteName} — The create-next-app for MCP servers`,
    description: siteDescription,
    siteName,
    images: [
      {
        url: `${siteUrl}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — The create-next-app for MCP servers`,
    description: siteDescription,
    images: [`${siteUrl}/og-image.svg`],
  },
  category: 'technology',
  other: {
    'github-repo': `https://github.com/${repoOwner}/${repoName}`,
  },
};
