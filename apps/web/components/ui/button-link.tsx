import Link from 'next/link';
import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  external?: boolean;
};

export function ButtonLink({
  href,
  children,
  variant = 'primary',
  className,
  external = false,
}: ButtonLinkProps) {
  const base =
    'inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]';

  const styles = {
    primary:
      'bg-[var(--foreground)] text-[var(--background)] hover:-translate-y-0.5',
    secondary:
      'border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--muted)]',
    ghost: 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--muted)]',
  } as const;

  return (
    <Link
      href={href}
      className={cn(base, styles[variant], className)}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </Link>
  );
}