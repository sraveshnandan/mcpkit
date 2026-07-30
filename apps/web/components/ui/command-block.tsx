import { CopyButton } from './copy-button';

export function CommandBlock({
  label,
  command,
}: {
  label: string;
  command: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
      <div className="flex h-10 items-center justify-between gap-3 border-b border-[var(--border)] px-4">
        <span className="text-xs font-medium text-[var(--muted-foreground)]">
          {label}
        </span>
        <CopyButton value={command} />
      </div>
      <div className="overflow-x-auto px-4 py-3 font-mono text-sm text-[var(--foreground)]">
        <span className="mr-2 text-[var(--primary)]">$</span>
        <span>{command}</span>
      </div>
    </div>
  );
}