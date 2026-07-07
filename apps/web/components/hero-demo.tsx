'use client';

import { useMemo, useState } from 'react';

import { TerminalWindow } from '@/components/ui/terminal-window';
import { cn } from '@/lib/utils';

const steps = [
  'Creating project',
  'Applying basic template',
  'Writing TypeScript files',
  'Adding development scripts',
  'Installing dependencies',
  'Adding VS Code MCP config',
] as const;

export function HeroDemo() {
  const [active, setActive] = useState<number>(steps.length - 1);

  const status = useMemo(
    () =>
      steps.map((step, index) => ({
        label: step,
        done: index <= active,
      })),
    [active]
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
      <TerminalWindow title="workflow / command rail">
        <div className="space-y-5">
          <div>
            <div className="mb-2 text-white/45">$ npm install -g mcpkit-cli</div>
            <div>
              <span className="text-[var(--transport)]">$</span>{' '}
              <span>mcpkit init hello-mcp --template basic --package-manager npm --yes</span>
            </div>
          </div>
          <div className="grid gap-2">
            {status.map((step, index) => (
              <button
                key={step.label}
                type="button"
                className={cn(
                  'flex items-center justify-between rounded-2xl border px-3 py-2 text-left transition-colors',
                  step.done
                    ? 'border-[rgba(255,179,0,0.32)] bg-[rgba(255,179,0,0.12)] text-white'
                    : 'border-white/10 bg-white/[0.03] text-white/55 hover:text-white/75'
                )}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
              >
                <span>{step.done ? '✓' : '·'} {step.label}</span>
                <span className="text-[0.72rem] uppercase tracking-[0.2em]">{index + 1}</span>
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-white/82">
            <div className="mb-2 text-[0.72rem] uppercase tracking-[0.2em] text-white/45">ready</div>
            <div className="space-y-1">
              <div><span className="text-[var(--transport)]">$</span> cd hello-mcp</div>
              <div><span className="text-[var(--transport)]">$</span> npm run dev</div>
              <div className="pt-2 text-[var(--signal)]">hello-mcp MCP server running on stdio</div>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <div className="rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
        <div className="mb-4 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
          command system
        </div>
        <div className="space-y-3">
          {['init', 'dev', 'test', 'validate', 'doctor', 'build', 'ship'].map((command, index) => (
            <div key={command} className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--bg)] text-xs font-medium text-[var(--muted)]">
                {index + 1}
              </span>
              <div className="flex-1 rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-3">
                <div className="font-mono text-sm text-[var(--ink)]">mcpkit {command}</div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
          The interaction is immediate by design: even without motion, the sequence explains the real path
          from scaffold to a running server and the follow-up workflow that comes after generation.
        </p>
      </div>
    </div>
  );
}
