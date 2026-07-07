import {
  BookOpenText,
  Boxes,
  Command,
  GitBranch,
  Package,
  Terminal,
} from 'lucide-react';

import type { ComponentType } from 'react';

export interface MarketingLink {
  label: string;
  href: string;
}

export interface QuickAction {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
}

export const site = {
  name: 'mcpkit',
  packageName: 'mcpkit-cli',
  tagline: 'The create-next-app for MCP servers.',
  description:
    'Build, validate, test, diagnose, document, and ship Model Context Protocol servers with one coherent toolkit.',
  githubUrl: 'https://github.com/sraveshnandan/mcpkit',
  npmUrl: 'https://www.npmjs.com/package/mcpkit-cli',
  docsUrl: '/docs',
  quickStartUrl: '/docs/quick-start',
};

export const marketingLinks: MarketingLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'CLI', href: '/docs/cli' },
  { label: 'Templates', href: '/docs/templates' },
  { label: 'GitHub', href: site.githubUrl },
];

export const quickActions: QuickAction[] = [
  { label: 'Quick Start', href: site.quickStartUrl, icon: Terminal },
  { label: 'CLI reference', href: '/docs/cli', icon: Command },
  { label: 'Templates', href: '/docs/templates', icon: Boxes },
  { label: 'Documentation', href: '/docs', icon: BookOpenText },
  { label: 'Install package', href: site.npmUrl, icon: Package },
  { label: 'GitHub', href: site.githubUrl, icon: GitBranch },
];

export const installCommand = `npm install -g ${site.packageName}`;
export const quickStartCreateCommand =
  'mcpkit init hello-mcp --template basic --package-manager npm --yes';
