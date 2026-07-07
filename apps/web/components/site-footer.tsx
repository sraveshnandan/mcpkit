import Link from 'next/link';

import { Brand } from '@/components/brand';
import { quickActions, site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--panel)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-4">
          <Brand />
          <p className="max-w-2xl text-sm leading-7 text-[var(--muted)]">
            {site.description} The website and docs are written from the repository as it exists today,
            not from future roadmap assumptions.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {quickActions.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--signal)]"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
