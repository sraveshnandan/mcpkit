import { CopyButton } from './copy-button';

export function CommandBlock({
  label,
  command,
}: {
  label: string;
  command: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-[var(--line)]">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          {label}
        </span>
        <CopyButton value={command} />
      </div>
      <div className="overflow-x-auto px-4 py-3 font-mono text-sm text-[var(--ink)]">
        <span className="mr-3 text-[var(--transport)]">$</span>
        <span>{command}</span>
      </div>
    </div>
  );
}
