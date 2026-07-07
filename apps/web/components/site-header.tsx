import Link from 'next/link';

import { Brand } from '@/components/brand';
import { ButtonLink } from '@/components/ui/button-link';
import { marketingLinks } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 px-4 py-3 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 rounded-[1.4rem] border border-[color:color-mix(in_srgb,var(--line)_82%,transparent)] bg-[color:color-mix(in_srgb,var(--bg)_84%,transparent)] px-4 py-3 shadow-[0_18px_40px_rgba(13,10,21,0.10)] backdrop-blur-xl sm:px-5">
        <Brand />
        <nav aria-label="Primary" className="hidden items-center gap-5 md:flex">
          {marketingLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-[var(--muted)] transition-colors duration-200 hover:text-[var(--ink)]"
              {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ButtonLink href="/docs/quick-start" variant="secondary" className="hidden sm:inline-flex">
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
