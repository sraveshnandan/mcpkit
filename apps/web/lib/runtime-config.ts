export const repoOwner = 'sraveshnandan';
export const repoName = 'mcpkit';

export const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const defaultBasePath = isGitHubPages ? `/${repoName}` : '';

export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? defaultBasePath).replace(/\/$/, '');

const defaultSiteUrl = isGitHubPages
  ? `https://${repoOwner}.github.io/${repoName}`
  : 'https://mcpkit.dev';

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? defaultSiteUrl).replace(/\/$/, '');
