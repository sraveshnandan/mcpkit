'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is mcpkit, exactly?',
    answer:
      'mcpkit is a CLI toolkit for creating and working with TypeScript MCP servers. In the current repository it covers project creation, development helpers, testing, validation, diagnostics, docs generation, builds, publishing, and shell completions.',
    tag: 'product',
    href: '/docs/why-mcpkit',
    label: 'Why mcpkit',
  },
  {
    question: 'Which template should I start with?',
    answer:
      'Use `basic` for the smallest stdio setup, `http` for a Streamable HTTP endpoint, `auth` when you need bearer-token protection on `/mcp`, and `full` when you also want logging, metrics, health checks, and linting or formatting config. The auth-oriented templates still need real JWKS-backed configuration for a complete auth flow.',
    tag: 'templates',
    href: '/docs/templates/choosing-a-template',
    label: 'Choose a template',
  },
  {
    question: 'Can I use npm, pnpm, or Bun?',
    answer:
      'Yes. `init` supports `bun`, `npm`, and `pnpm`. The docs quick start uses npm because it is broadly available in Node setups. `ship` can publish with bun, pnpm, yarn, or npm after detecting the package manager from your project.',
    tag: 'package managers',
    href: '/docs/installation',
    label: 'Installation',
  },
  {
    question: 'Is mcpkit only for local MCP servers?',
    answer:
      'No. The `basic` template is stdio-first, while `http`, `auth`, and `full` generate Streamable HTTP servers. That means mcpkit can start with local development and still support remote-style MCP server setups.',
    tag: 'transport',
    href: '/docs/concepts/transports',
    label: 'Transports',
  },
  {
    question: 'Does `validate` do deep protocol validation?',
    answer:
      'Not yet. The current `validate` command performs heuristic string checks against a source file. It is useful as a quick guardrail, but it should not be treated as complete protocol or runtime verification.',
    tag: 'validation',
    href: '/docs/cli/validate',
    label: 'Validate command',
  },
  {
    question: 'Can I keep using the generated project without the CLI later?',
    answer:
      'Yes. After scaffolding, the output is just a regular Node and TypeScript project with normal package scripts. You can keep working directly inside the generated project even if you stop using the CLI commands.',
    tag: 'workflow',
    href: '/docs/getting-started/understand-generated-project',
    label: 'Generated project',
  },
] as const;

export function FaqGrid() {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
      <aside className="rounded-[1.9rem] border border-[var(--line-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--signal)_10%,var(--panel-strong)),var(--panel-strong))] p-6 shadow-[0_20px_70px_rgba(69,38,137,0.10)]">
        <div className="space-y-4">
          <div className="inline-flex rounded-full border border-[color:color-mix(in_srgb,var(--signal)_28%,var(--line))] bg-[color:color-mix(in_srgb,var(--signal)_10%,var(--bg))] px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[var(--signal-strong)]">
            Verified answers
          </div>
          <h3 className="font-display text-3xl tracking-[-0.04em] text-[var(--ink)] sm:text-[2.15rem]">
            Questions developers actually ask before running the command.
          </h3>
          <p className="text-sm leading-7 text-[var(--muted)] sm:text-base">
            The FAQ stays grounded in the current repository state: current commands, real templates, and real limitations.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {['templates', 'workflow', 'validation', 'transports'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1 text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
              >
                {item}
              </span>
            ))}
          </div>
          <Link
            href="/docs/help/faq"
            className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-[var(--ink)] transition-colors hover:text-[var(--signal-strong)]"
          >
            Read the full documentation FAQ
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </aside>

      <div className="space-y-3">
        {faqs.map((item, index) => {
          const isOpen = open === index;

          return (
            <article
              key={item.question}
              className="overflow-hidden rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] shadow-[0_12px_40px_rgba(17,21,26,0.05)] transition-colors hover:border-[color:color-mix(in_srgb,var(--signal)_35%,var(--line-strong))]"
            >
              <button
                type="button"
                className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--signal)] focus-visible:ring-inset"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <div className="space-y-2">
                  <div className="inline-flex rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.tag}
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-[var(--ink)] sm:text-lg">
                    {item.question}
                  </h3>
                </div>
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-transform ${
                    isOpen
                      ? 'border-[var(--signal)] bg-[color:color-mix(in_srgb,var(--signal)_14%,var(--bg))] text-[var(--signal-strong)] rotate-180'
                      : 'border-[var(--line)] bg-[var(--bg)] text-[var(--muted)]'
                  }`}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>

              {isOpen ? (
                <div className="border-t border-[var(--line)] px-5 pb-5 pt-4">
                  <p className="text-sm leading-7 text-[var(--muted)] sm:text-[0.96rem]">{item.answer}</p>
                  <Link
                    href={item.href}
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--signal-strong)] transition-colors hover:text-[var(--ink)]"
                  >
                    {item.label}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </div>
  );
}
