import Link from 'next/link';
import { Command, Boxes, BookOpenText, GitBranch, Package } from 'lucide-react';

import { Brand } from '@/components/brand';
import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--muted)]/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          <div className="col-span-2 space-y-4">
            <Brand />
            <p className="max-w-xs text-sm text-[var(--muted-foreground)]">
              {site.tagline} The website and docs are written from the repository as it exists today, not from future roadmap assumptions.
            </p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--foreground)]">Docs</h4>
            <ul className="space-y-2">
              <li><Link href="/docs" className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Introduction</Link></li>
              <li><Link href="/docs/quick-start" className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Quick Start</Link></li>
              <li><Link href={site.changelogUrl} className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--foreground)]">CLI</h4>
            <ul className="space-y-2">
              <li><Link href="/docs/cli" className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Commands</Link></li>
              <li><Link href="/docs/templates" className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Templates</Link></li>
              <li><Link href="/docs/guides" className="text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]">Guides</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold text-[var(--foreground)]">Source</h4>
            <ul className="space-y-2">
              <li><a href={site.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"><GitBranch className="size-4" /> GitHub</a></li>
              <li><a href={site.npmUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] transition-colors hover:text-[var(--foreground)]"><Package className="size-4" /> npm</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--border)] pt-8 md:flex-row">
          <p className="text-sm text-[var(--muted-foreground)]">© 2026 mcpkit contributors. MIT Licensed.</p>
          <p className="text-sm text-[var(--muted-foreground)]">mcpkit.js.org</p>
        </div>
      </div>
    </footer>
  );
}