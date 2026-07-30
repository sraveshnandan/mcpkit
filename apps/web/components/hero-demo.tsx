'use client';

import { CheckCircle2, CircleDashed, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

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

const fallbackStage = stages[stages.length - 1]!;

export function HeroDemo() {
  const [active, setActive] = useState(stages.length - 1);

  const current = useMemo(() => stages[active] ?? fallbackStage, [active]);

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <span className="absolute -left-4 top-28 hidden rounded-md bg-teal-400 px-3 py-1 text-xs font-semibold text-[#062a2e] shadow-lg shadow-teal-950/30 sm:block dark:bg-teal-300 dark:text-[#062a2e]">
        create
      </span>
      <span className="absolute -right-4 top-48 hidden rounded-md bg-violet-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-violet-950/30 sm:block dark:bg-violet-400 dark:text-[#1a0e2e]">
        client config
      </span>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#10111b] shadow-2xl shadow-black/30 ring-1 ring-white/5">
        <div className="flex h-12 items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#06d6a0]" />
          <span className="ml-4 flex h-full items-center gap-2 border-x border-white/10 bg-white/[0.05] px-4 text-xs text-white">
            <Sparkles className="size-3.5 text-emerald-300" />
            terminal
          </span>
        </div>
        <div className="p-5 sm:p-6">
          <div className="space-y-3 font-mono text-sm leading-7">
            <div className="text-emerald-300">$ npm install -g mcpkit-cli</div>
            <div className="overflow-x-auto whitespace-nowrap">
              <span className="text-indigo-300">$</span>{' '}
              <span className="text-zinc-200">mcpkit init hello-mcp --template basic --package-manager npm --yes</span>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
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
                      'grid gap-1.5 rounded-lg border px-3 py-2.5 text-left transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]',
                      selected
                        ? 'border-[#06d6a0]/50 bg-[#06d6a0]/10'
                        : done
                          ? 'border-[#06d6a0]/20 bg-[#06d6a0]/5 text-zinc-200'
                          : 'border-white/10 bg-white/[0.03] text-zinc-500 hover:border-white/20 hover:text-zinc-300'
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-emerald-300">
                          {done ? <CheckCircle2 className="size-4" /> : <CircleDashed className="size-4" />}
                        </span>
                        <div>
                          <div className="text-xs font-medium tracking-tight text-white">{stage.title}</div>
                          <div className="mt-0.5 text-[0.68rem] leading-4 text-zinc-500">{stage.note}</div>
                        </div>
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[0.62rem] uppercase tracking-wider text-zinc-500">
                        {index + 1}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid gap-3">
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-100">
                  <Sparkles className="size-3.5 text-amber-200" />
                  active stage
                </div>
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-white">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-zinc-400">{current.detail}</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {[
                    { label: 'template', value: 'basic' },
                    { label: 'transport', value: 'stdio' },
                    { label: 'config', value: '.vscode/mcp.json' },
                    { label: 'package', value: 'npm' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <div className="text-[0.62rem] font-medium uppercase tracking-wider text-zinc-500">
                        {item.label}
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-zinc-200">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-3 text-xs leading-5 text-zinc-300">
                <div className="mb-1.5 flex items-center gap-2 text-[0.68rem] uppercase tracking-wider text-zinc-500">
                  <Sparkles className="size-3 text-emerald-300" />
                  ready
                </div>
                <div className="space-y-1 font-mono">
                  <div><span className="text-emerald-300">$</span> cd hello-mcp</div>
                  <div><span className="text-emerald-300">$</span> npm run dev</div>
                  <div className="pt-1.5 text-emerald-300">hello-mcp MCP server running on stdio</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}