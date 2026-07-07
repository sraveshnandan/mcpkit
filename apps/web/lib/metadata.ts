import type { Metadata } from 'next';

export const siteUrl = 'https://mcpkit.dev';
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
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title: `${siteName} — The create-next-app for MCP servers`,
    description: siteDescription,
    siteName,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} — The create-next-app for MCP servers`,
    description: siteDescription,
  },
  category: 'technology',
};
