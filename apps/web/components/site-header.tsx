import Link from 'next/link';
import { GitBranch } from 'lucide-react';

import { Brand } from '@/components/brand';
import { marketingLinks, site } from '@/lib/site';
import { ButtonLink } from '@/components/ui/button-link';

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full px-2 pt-2">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 rounded-[1.4rem] border border-[var(--border)] bg-[var(--background)]/70 px-4 shadow-md backdrop-blur-xl transition-all duration-200 lg:px-6">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {marketingLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)]/40 hover:text-[var(--foreground)]"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 py-3">
          <ButtonLink href={site.npmUrl} external>
            Install
          </ButtonLink>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden size-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)] lg:flex"
            aria-label="GitHub"
          >
            <GitBranch className="size-4" />
          </a>
        </div>
      </div>
    </header>
  );
}