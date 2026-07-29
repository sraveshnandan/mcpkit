import Link from 'next/link';
import { BookOpenText, Boxes, Command, GitBranch, Package } from 'lucide-react';

import { Brand } from '@/components/brand';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Brand />
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {site.description} The website and docs are written from the repository as it exists today, not from future roadmap assumptions.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { label: 'Docs', href: '/docs' },
            { label: 'CLI Reference', href: '/docs/cli', icon: Command },
            { label: 'Templates', href: '/docs/templates', icon: Boxes },
            { label: 'Guides', href: '/docs/guides', icon: BookOpenText },
            { label: 'Changelog', href: site.changelogUrl },
            { label: 'Source code', href: site.githubUrl, icon: GitBranch, external: true },
            { label: 'npm package', href: site.npmUrl, icon: Package, external: true },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {item.icon ? <item.icon className="size-4" /> : null}
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-xs text-[var(--muted)]">© 2026 mcpkit contributors. MIT Licensed.</p>
          <p className="text-xs text-[var(--muted)]">mcpkit.js.org</p>
        </div>
      </div>
    </footer>
  );
}
