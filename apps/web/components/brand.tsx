import Link from 'next/link';

import { cn } from '@/lib/utils';

export function Brand({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'group inline-flex items-center gap-3 rounded-full px-1 py-1 text-sm font-medium tracking-[0.08em] text-[var(--ink)] transition-colors hover:text-[var(--signal-strong)]',
        className
      )}
      aria-label="mcpkit home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--line-strong)] bg-[var(--panel-strong)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
        <span className="relative flex h-5 w-5 items-center justify-center">
          <span className="absolute inset-y-0 left-[2px] w-px bg-[var(--transport)]" />
          <span className="absolute right-[2px] top-0 h-px w-3 bg-[var(--signal)]" />
          <span className="absolute bottom-0 left-[6px] h-px w-3 bg-[var(--signal)]" />
          <span className="absolute inset-y-[3px] right-[5px] w-px bg-[var(--signal)]" />
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] tracking-[0.22em]">mcpkit</span>
        <span className="mt-0.5 text-[0.62rem] uppercase tracking-[0.26em] text-[var(--muted)]">
          MCP toolkit
        </span>
      </span>
    </Link>
  );
}
