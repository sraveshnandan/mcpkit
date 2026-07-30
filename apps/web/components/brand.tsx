import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2.5 py-3',
        className
      )}
      aria-label="mcpkit home"
    >
      <span className="brand-mark flex size-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--muted)] text-[var(--primary)]">
        <svg viewBox="0 0 24 24" fill="none" className="size-4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m7 10 2-2-2-2" />
          <rect width="10" height="12" x="7" y="6" rx="2" />
          <path d="M17 18h-5" />
        </svg>
      </span>
      <span className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
        mcpkit
      </span>
    </Link>
  );
}