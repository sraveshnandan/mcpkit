const fileTree = [
  'package.json',
  'tsconfig.json',
  '.vscode/mcp.json',
  'src/index.ts',
  'src/auth.ts',
  'src/logger.ts',
  'src/health.ts',
  'src/metrics.ts',
  'eslint.config.js',
  '.prettierrc',
] as const;

export function ProjectStructureView() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          generated structure / full template
        </div>
        <div className="space-y-2 font-mono text-sm text-[var(--ink)]">
          {fileTree.map((file) => (
            <div key={file} className="rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-2.5">
              {file}
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          why the files exist
        </div>
        <div className="space-y-4 text-sm leading-7 text-[var(--muted)]">
          <p>
            The generated structure is not just an entry file. The `full` template adds the surrounding
            workflow pieces developers usually end up hand-assembling later: auth wiring, logging,
            health checks, metrics, linting, and formatting.
          </p>
          <p>
            The docs reference uses the real generated file set, and the template pages explain where
            the current implementation is strong and where it still has caveats.
          </p>
          <ul className="space-y-2">
            <li><span className="font-mono text-[var(--ink)]">src/index.ts</span> wires routes, transport, auth, and metrics.</li>
            <li><span className="font-mono text-[var(--ink)]">src/auth.ts</span> holds bearer-token verification middleware.</li>
            <li><span className="font-mono text-[var(--ink)]">src/health.ts</span> returns uptime and version data.</li>
            <li><span className="font-mono text-[var(--ink)]">src/metrics.ts</span> stores in-memory counters and timing samples.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
