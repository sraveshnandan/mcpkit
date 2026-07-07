'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

import { CommandBlock } from '@/components/ui/command-block';

type QuickStartStep = {
  id: string;
  label: string;
  title: string;
  summary: string;
  commands: Array<{ label: string; command: string }>;
  points: string[];
  links?: Array<{ href: string; label: string }>;
};

const steps: QuickStartStep[] = [
  {
    id: 'install',
    label: 'Install',
    title: 'Install the published CLI package',
    summary:
      'Use the current npm package name directly so the command works without assuming a local clone or a Bun-only setup.',
    commands: [{ label: 'install', command: 'npm install -g mcpkit-cli' }],
    points: [
      'Installs the `mcpkit` binary from the published `mcpkit-cli` package.',
      'Matches the package metadata used elsewhere in the repository.',
    ],
  },
  {
    id: 'create',
    label: 'Create',
    title: 'Generate a working project in one command',
    summary:
      'This path uses the `basic` template and explicit npm package-manager selection to stay broadly usable for new users.',
    commands: [
      {
        label: 'create',
        command: 'mcpkit init hello-mcp --template basic --package-manager npm --yes',
      },
    ],
    points: [
      'Uses the verified `basic` template.',
      'Sets the default description to `A hello-mcp MCP server` in non-interactive mode.',
      'Installs dependencies automatically because `--yes` selects the defaults.',
      'Generates `.vscode/mcp.json` for client configuration.',
    ],
  },
  {
    id: 'run',
    label: 'Run',
    title: 'Start the generated server immediately',
    summary:
      'The generated project is a normal TypeScript app with package scripts, so you can run it directly without another wrapper layer.',
    commands: [
      { label: 'change directory', command: 'cd hello-mcp' },
      { label: 'develop', command: 'npm run dev' },
    ],
    points: [
      'In the `basic` template, the dev script runs `tsx watch src/index.ts`.',
      'The generated server creates an `McpServer`, registers a `greet` tool, and connects with `StdioServerTransport`.',
      'Startup logging goes to stderr so it does not interfere with stdio transport output.',
    ],
  },
  {
    id: 'next',
    label: 'Next',
    title: 'Use the docs as your next move, not an afterthought',
    summary:
      'Once the server is running, keep going with the pages that explain the generated project, testing flow, and template options.',
    commands: [],
    points: [
      'Understand the generated file structure before editing it.',
      'Move into testing and validation once you add your own tools.',
      'Switch templates later if you need HTTP transport or auth-oriented scaffolding.',
    ],
    links: [
      { href: '/docs/getting-started/understand-generated-project', label: 'Understand the generated project' },
      { href: '/docs/getting-started/test-it', label: 'Test it' },
      { href: '/docs/templates/choosing-a-template', label: 'Choose a template' },
    ],
  },
];

export function DocsQuickStart() {
  const [active, setActive] = useState(1);
  const step = steps[active] ?? steps[0]!;

  return (
    <div className="not-prose my-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <div className="rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-4 shadow-[0_18px_60px_rgba(69,38,137,0.08)]">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          quick start guide
        </div>
        <div className="grid gap-2">
          {steps.map((item, index) => {
            const selected = index === active;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`rounded-2xl border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] ${
                  selected
                    ? 'border-[var(--signal)] bg-[color:color-mix(in_srgb,var(--signal)_12%,var(--bg))] shadow-[0_10px_30px_rgba(91,49,196,0.12)]'
                    : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--line-strong)] hover:bg-[var(--bg-elevated)]'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    step {index + 1}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[0.68rem] font-medium uppercase tracking-[0.18em] ${
                      selected
                        ? 'bg-[color:color-mix(in_srgb,var(--signal)_16%,var(--bg))] text-[var(--signal-strong)]'
                        : 'bg-[var(--panel)] text-[var(--muted)]'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--ink)]">{item.title}</div>
                <p className="mt-1 text-sm leading-6 text-[var(--muted)]">{item.summary}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="rounded-[1.85rem] border border-[var(--line-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--signal)_8%,var(--panel-strong)),var(--panel-strong))] p-5 shadow-[0_20px_70px_rgba(69,38,137,0.10)] sm:p-6">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-[color:color-mix(in_srgb,var(--signal)_25%,var(--line))] bg-[color:color-mix(in_srgb,var(--signal)_10%,var(--bg))] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--signal-strong)]">
            under two minutes
          </div>
          <div className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            repository-verified
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)]">{step.title}</h3>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">{step.summary}</p>
          </div>

          {step.commands.length > 0 ? (
            <div className="space-y-3">
              {step.commands.map((command) => (
                <CommandBlock key={command.label} label={command.label} command={command.command} />
              ))}
            </div>
          ) : null}

          <div className="rounded-[1.35rem] border border-[var(--line)] bg-[var(--bg-elevated)] p-4 sm:p-5">
            <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              what to expect
            </div>
            <ul className="space-y-3">
              {step.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm leading-7 text-[var(--muted)]">
                  <CheckCircle2 className="mt-1 size-4 shrink-0 text-[var(--signal-strong)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {step.links?.length ? (
            <div className="flex flex-wrap gap-3 pt-1">
              {step.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-2 text-sm font-medium text-[var(--ink)] transition-colors hover:border-[var(--signal)] hover:text-[var(--signal-strong)]"
                >
                  {link.label}
                  <ArrowRight className="size-4" />
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
