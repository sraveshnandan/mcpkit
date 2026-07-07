import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export function SectionLabel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]',
        className
      )}
    >
      <span className="h-2 w-2 rounded-full bg-[var(--signal)]" />
      {children}
    </div>
  );
}
