import type { ReactNode } from 'react';
import { BookOpenText, Boxes, Command, PackageSearch } from 'lucide-react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';

import { source } from '@/lib/source';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.getPageTree()}
      nav={{
        title: 'mcpkit',
        url: '/',
      }}
      githubUrl="https://github.com/sraveshnandan/mcpkit"
      searchToggle={{ enabled: true }}
      themeSwitch={{ enabled: true }}
      links={[
        { text: 'Docs', url: '/docs', active: 'nested-url' },
        { text: 'CLI', url: '/docs/cli', active: 'nested-url', icon: <Command className="size-4" /> },
        { text: 'Templates', url: '/docs/templates', active: 'nested-url', icon: <Boxes className="size-4" /> },
        { text: 'Guides', url: '/docs/guides', active: 'nested-url', icon: <BookOpenText className="size-4" /> },
        { type: 'button', text: 'Install', url: 'https://www.npmjs.com/package/mcpkit-cli', external: true, icon: <PackageSearch className="size-4" /> },
      ]}
    >
      {children}
    </DocsLayout>
  );
}
