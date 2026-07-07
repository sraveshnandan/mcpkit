import { CopyButton } from './copy-button';

export function CommandBlock({
  label,
  command,
}: {
  label: string;
  command: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-4 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          {label}
        </span>
        <CopyButton value={command} />
      </div>
      <div className="overflow-x-auto rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3 font-mono text-sm text-[var(--ink)]">
        <span className="mr-3 text-[var(--transport)]">$</span>
        <span>{command}</span>
      </div>
    </div>
  );
}
