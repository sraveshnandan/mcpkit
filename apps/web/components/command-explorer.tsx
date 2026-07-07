'use client';

import { useMemo, useState } from 'react';

import { TerminalWindow } from '@/components/ui/terminal-window';

const commands = [
  {
    name: 'init',
    syntax: 'mcpkit init my-server --template basic --package-manager npm --yes',
    summary: 'Scaffold a new MCP server project from one of the four templates.',
    options: ['--template <template>', '--package-manager <pm>', '--yes'],
    output: ['ℹ Creating project: my-server', 'ℹ Template: basic', 'ℹ Package manager: npm', '✔ Project created successfully!'],
  },
  {
    name: 'dev',
    syntax: 'mcpkit dev --entry src/index.ts --inspect --test',
    summary: 'Start the entry file with tsx watch, optionally opening MCP Inspector and Vitest watch.',
    options: ['--entry <entry>', '--transport <transport>', '--port <port>', '--inspect', '--test'],
    output: ['ℹ Starting development server...', 'ℹ Opening MCP Inspector...', 'ℹ Starting test watcher...'],
  },
  {
    name: 'validate',
    syntax: 'mcpkit validate --file src/index.ts',
    summary: 'Run lightweight source-file heuristics against an MCP server entry file.',
    options: ['--file <file>', '--verbose'],
    output: ['✔ Configuration is valid', '✔ Validation passed!'],
  },
  {
    name: 'doctor',
    syntax: 'mcpkit doctor --json',
    summary: 'Inspect environment, project structure, MCP SDK presence, tool definitions, and config files.',
    options: ['--json', '--verbose'],
    output: ['{', '  "environment": { ... },', '  "project": { ... },', '  "mcp": { ... }', '}'],
  },
  {
    name: 'build',
    syntax: 'mcpkit build --outDir dist --no-clean',
    summary: 'Run a TypeScript build step, optionally keeping the existing output directory.',
    options: ['--outDir <outDir>', '--no-clean', '--dry-run', '--verbose'],
    output: ['✔ Build completed successfully!', 'Build output:', '  JS files: 1', '  Type defs: 1'],
  },
  {
    name: 'ship',
    syntax: 'mcpkit ship --bump patch --dry-run',
    summary: 'Run tests, build, bump the package version, and publish with the detected package manager.',
    options: ['--bump <bump>', '--dry-run', '--verbose'],
    output: ['ℹ Package manager: npm', 'ℹ Current version: 0.1.0', '⚠ Dry run mode - no changes will be made'],
  },
] as const;

export function CommandExplorer() {
  const [selected, setSelected] = useState<(typeof commands)[number]['name']>(
    commands[0]?.name ?? 'init'
  );
  const command = useMemo(
    () => commands.find((item) => item.name === selected) ?? commands[0],
    [selected]
  );

  if (!command) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-4">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          command explorer
        </div>
        <div className="grid gap-2">
          {commands.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setSelected(item.name)}
              className={`rounded-2xl border px-4 py-3 text-left transition-colors ${
                item.name === command.name
                  ? 'border-[var(--signal)] bg-[color:color-mix(in_srgb,var(--signal)_10%,var(--panel))]'
                  : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--line-strong)]'
              }`}
            >
              <div className="font-mono text-sm text-[var(--ink)]">mcpkit {item.name}</div>
              <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
            </button>
          ))}
        </div>
      </div>

      <TerminalWindow title={`command / ${command.name}`}>
        <div className="space-y-5">
          <div>
            <div className="mb-2 text-white/45">syntax</div>
            <div><span className="text-[var(--transport)]">$</span> {command.syntax}</div>
          </div>
          <div>
            <div className="mb-2 text-white/45">verified options</div>
            <div className="flex flex-wrap gap-2">
              {command.options.map((option) => (
                <span key={option} className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/82">
                  {option}
                </span>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-white/45">realistic output preview</div>
            <div className="space-y-1 text-white/84">
              {command.output.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
