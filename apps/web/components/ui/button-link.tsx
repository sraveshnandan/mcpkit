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
    'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] motion-safe:hover:-translate-y-0.5';

  const styles = {
    primary:
      'border-[var(--signal)] bg-[var(--signal)] text-white shadow-[0_10px_30px_rgba(91,49,196,0.22)] hover:bg-[var(--signal-strong)]',
    secondary:
      'border-[var(--line-strong)] bg-[var(--panel)] text-[var(--ink)] hover:border-[var(--signal)] hover:bg-[var(--panel-strong)]',
    ghost: 'border-transparent bg-transparent text-[var(--muted)] hover:text-[var(--ink)]',
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
