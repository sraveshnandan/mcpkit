import { cn } from '@/lib/utils';

export function PipelineRail({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-[1.5rem] border border-[var(--line)] bg-[var(--panel)] px-4 py-4',
        className
      )}
    >
      <div className="flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
        {items.map((item, index) => (
          <div key={item} className="flex items-center gap-3">
            <span className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 py-1.5 text-[var(--ink)]">
              {item}
            </span>
            {index < items.length - 1 ? (
              <span className="h-px w-6 bg-[var(--line-strong)] sm:w-8" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
