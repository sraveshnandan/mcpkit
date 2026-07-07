const templates = [
  {
    name: 'basic',
    transport: 'stdio',
    useCase: 'Start fast, learn the MCP shape, and run locally with the fewest moving parts.',
    files: ['src/index.ts', '.vscode/mcp.json'],
  },
  {
    name: 'http',
    transport: 'Streamable HTTP',
    useCase: 'Expose an HTTP MCP endpoint with home and health routes on port 3100.',
    files: ['src/index.ts', '.vscode/mcp.json'],
  },
  {
    name: 'auth',
    transport: 'HTTP + bearer auth',
    useCase: 'Protect `/mcp` with bearer-token verification and a separate auth helper.',
    files: ['src/index.ts', 'src/auth.ts', '.vscode/mcp.json'],
  },
  {
    name: 'full',
    transport: 'HTTP + auth + ops',
    useCase: 'Add metrics, structured logging, health checks, linting, and formatting config.',
    files: ['src/index.ts', 'src/auth.ts', 'src/logger.ts', 'src/health.ts', 'src/metrics.ts'],
  },
] as const;

export function TemplateJourney() {
  return (
    <div className="grid gap-4 lg:grid-cols-4">
      {templates.map((template, index) => (
        <article
          key={template.name}
          className="relative rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5"
        >
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              stage {index + 1}
            </span>
            <span className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-xs font-mono text-[var(--ink)]">
              {template.transport}
            </span>
          </div>
          <h3 className="font-display text-2xl tracking-tight text-[var(--ink)]">{template.name}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{template.useCase}</p>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink)]">
            {template.files.map((file) => (
              <li key={file} className="font-mono text-xs text-[var(--muted)]">
                {file}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
