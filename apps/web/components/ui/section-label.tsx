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
    <span
      className={cn(
        'text-sm font-medium text-[var(--primary)]',
        className
      )}
    >
      {children}
    </span>
  );
}