import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-3 rounded-full px-1 py-1 text-sm font-medium tracking-[0.08em] text-[var(--ink)] transition-colors duration-200 hover:text-[var(--signal-strong)]',
        className
      )}
      aria-label="mcpkit home"
    >
      <span className="brand-mark flex h-10 w-10 items-center justify-center rounded-[1rem] border border-[color:var(--line-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--signal)_15%,var(--panel-strong)),var(--panel-strong))] font-display text-lg font-bold tracking-[-0.08em] text-[var(--signal-strong)] shadow-[0_10px_30px_rgba(91,49,196,0.10)] transition-transform duration-300 ease-out motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:scale-[1.03]">
        M
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.98rem] tracking-[0.18em]">mcpkit</span>
        <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.26em] text-[var(--muted)] transition-colors duration-200 group-hover:text-[var(--signal-strong)]/75">
          MCP toolkit
        </span>
      </span>
    </Link>
  );
}
