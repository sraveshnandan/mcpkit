'use client';

import { CheckCircle2, CircleDashed, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

import { PipelineRail } from '@/components/ui/pipeline-rail';
import { TerminalWindow } from '@/components/ui/terminal-window';
import { cn } from '@/lib/utils';

const stages = [
  {
    id: 'create-root',
    title: 'Creating project root',
    note: 'Writes the initial package and TypeScript project files.',
    meta: 'package.json · tsconfig.json · README.md · LICENSE',
    detail:
      'The generator creates a normal Node and TypeScript project first, so the scaffold is usable without any proprietary runtime layer.',
  },
  {
    id: 'apply-template',
    title: 'Applying basic template',
    note: 'Adds the smallest verified MCP server shape.',
    meta: 'src/index.ts · McpServer · StdioServerTransport',
    detail:
      'For the quick-start path, the `basic` template keeps the transport local and the generated surface small enough to understand immediately.',
  },
  {
    id: 'wire-scripts',
    title: 'Adding workflow scripts',
    note: 'Makes the generated project runnable right away.',
    meta: 'dev · build · test · test:watch · typecheck',
    detail:
      'The generated package scripts come from the template itself. For the basic template, `dev` runs `tsx watch src/index.ts` and `test` runs `vitest run`.',
  },
  {
    id: 'install-deps',
    title: 'Installing dependencies',
    note: 'The `--yes` path proceeds without stopping for prompts.',
    meta: 'npm install',
    detail:
      'Non-interactive mode keeps the first run short: project name, template, package manager, and dependency installation are all resolved up front.',
  },
  {
    id: 'client-config',
    title: 'Generating client config',
    note: 'Adds the currently generated MCP client config file.',
    meta: '.vscode/mcp.json',
    detail:
      'The generated client configuration is intentionally explicit. Today the templates create `.vscode/mcp.json`; the docs avoid claiming other generated client configs.',
  },
] as const;

const workflow = ['init', 'dev', 'test', 'validate', 'doctor', 'build', 'ship'] as const;
const fallbackStage = stages[stages.length - 1]!;

export function HeroDemo() {
  const [active, setActive] = useState(stages.length - 1);

  const current = useMemo(() => stages[active] ?? fallbackStage, [active]);

  return (
    <div className="grid gap-5 xl:grid-cols-[1.12fr_0.88fr]">
      <TerminalWindow
        title="command pipeline / quick start"
        className="border-[color:color-mix(in_srgb,var(--signal)_24%,var(--line-strong))] bg-[linear-gradient(180deg,rgba(10,8,16,0.98),rgba(18,13,28,0.98))]"
      >
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">quick start</span>
            <span className="rounded-full border border-[rgba(159,103,255,0.24)] bg-[rgba(159,103,255,0.14)] px-2.5 py-1 text-[var(--signal-strong)]">
              basic template
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1">npm path</span>
          </div>

          <div className="space-y-2">
            <div className="text-white/45">$ npm install -g mcpkit-cli</div>
            <div className="overflow-x-auto whitespace-nowrap text-[0.96rem] sm:text-[1rem]">
              <span className="text-[var(--transport)]">$</span>{' '}
              <span>mcpkit init hello-mcp --template basic --package-manager npm --yes</span>
            </div>
          </div>

          <div className="grid gap-2.5">
            {stages.map((stage, index) => {
              const done = index <= active;
              const selected = index === active;

              return (
                <button
                  key={stage.id}
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  className={cn(
                    'grid gap-3 rounded-[1.2rem] border px-3.5 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)]',
                    selected
                      ? 'border-[rgba(159,103,255,0.55)] bg-[linear-gradient(90deg,rgba(159,103,255,0.18),rgba(255,255,255,0.03))] shadow-[0_12px_35px_rgba(91,49,196,0.18)]'
                      : done
                        ? 'border-[rgba(159,103,255,0.24)] bg-[rgba(159,103,255,0.10)] text-white'
                        : 'border-white/10 bg-white/[0.03] text-white/65 hover:text-white/82'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-[var(--signal-strong)]">
                        {done ? <CheckCircle2 className="size-4" /> : <CircleDashed className="size-4" />}
                      </span>
                      <div>
                        <div className="text-sm font-medium tracking-tight text-white">{stage.title}</div>
                        <div className="mt-1 text-xs leading-5 text-white/55">{stage.note}</div>
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 text-[0.68rem] uppercase tracking-[0.18em] text-white/48">
                      {index + 1}
                    </span>
                  </div>
                  <div className="pl-7 text-[0.72rem] uppercase tracking-[0.16em] text-[var(--signal-strong)]/85">
                    {stage.meta}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[1.35rem] border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-4 text-white/84">
            <div className="mb-2 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.18em] text-white/45">
              <Sparkles className="size-3.5 text-[var(--signal-strong)]" />
              ready
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="text-[var(--transport)]">$</span> cd hello-mcp
              </div>
              <div>
                <span className="text-[var(--transport)]">$</span> npm run dev
              </div>
              <div className="pt-2 text-[var(--signal-strong)]">
                hello-mcp MCP server running on stdio
              </div>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <div className="grid gap-5">
        <div className="rounded-[1.8rem] border border-[var(--line-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--signal)_10%,var(--panel-strong)),var(--panel-strong))] p-5 shadow-[0_20px_70px_rgba(69,38,137,0.10)]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
              active stage
            </div>
            <span className="rounded-full border border-[color:color-mix(in_srgb,var(--signal)_24%,var(--line))] bg-[color:color-mix(in_srgb,var(--signal)_10%,var(--bg))] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--signal-strong)]">
              repository verified
            </span>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-display text-[2rem] leading-none tracking-[-0.04em] text-[var(--ink)]">
                {current.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">{current.detail}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'template', value: 'basic' },
                { label: 'transport', value: 'stdio' },
                { label: 'client config', value: '.vscode/mcp.json' },
                { label: 'package manager', value: 'npm' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.15rem] border border-[var(--line)] bg-[var(--bg-elevated)] px-4 py-3"
                >
                  <div className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.label}
                  </div>
                  <div className="mt-1 font-mono text-sm text-[var(--ink)]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
          <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
            follow-up workflow
          </div>
          <PipelineRail items={[...workflow]} className="border-0 bg-transparent p-0" />
          <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
            The point is not only scaffolding. The command language stays coherent after generation, so the path from init to ship still reads like one tool.
          </p>
        </div>
      </div>
    </div>
  );
}
