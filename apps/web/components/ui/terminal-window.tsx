import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function TerminalWindow({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--terminal)] text-[var(--terminal-ink)] shadow-[0_24px_80px_rgba(0,0,0,0.28)]',
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
        </div>
        <span className="text-[0.72rem] uppercase tracking-[0.2em] text-white/55">{title}</span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-sm leading-6">{children}</div>
    </div>
  );
}
