import Link from 'next/link';

import { Brand } from '@/components/brand';
import { ButtonLink } from '@/components/ui/button-link';
import { marketingLinks } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {marketingLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/docs/getting-started/quick-start" variant="secondary" className="hidden sm:inline-flex">
            Quick Start
          </ButtonLink>
          <ButtonLink href="https://www.npmjs.com/package/mcpkit-cli" external>
            Install
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
