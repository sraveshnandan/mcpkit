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
        'overflow-hidden rounded-xl border border-white/10 bg-[#10111b] shadow-2xl shadow-black/30 ring-1 ring-white/5 text-[var(--terminal-ink)]',
        className
      )}
    >
      <div className="flex h-12 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
        <span className="ml-4 flex h-full items-center gap-2 border-x border-white/10 bg-white/[0.05] px-4 text-xs text-white">
          {title}
        </span>
      </div>
      <div className="overflow-x-auto p-5 font-mono text-sm leading-6">{children}</div>
    </div>
  );
}