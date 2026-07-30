import { ArrowRight, Check, GitBranch, PackageSearch, Star, Terminal } from 'lucide-react';

import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { HeroDemo } from '@/components/hero-demo';
import { ButtonLink } from '@/components/ui/button-link';
import { CommandBlock } from '@/components/ui/command-block';
import { SectionLabel } from '@/components/ui/section-label';
import { installCommand, quickStartCreateCommand, site } from '@/lib/site';

const commands = [
  { command: 'mcpkit init hello-mcp --template basic --package-manager npm --yes', label: 'create' },
  { command: 'mcpkit dev --transport http --port 3100 --inspect', label: 'dev' },
  { command: 'mcpkit test', label: 'test' },
  { command: 'mcpkit validate', label: 'validate' },
  { command: 'mcpkit doctor', label: 'doctor' },
  { command: 'mcpkit build', label: 'build' },
  { command: 'mcpkit ship', label: 'ship' },
  { command: 'mcpkit docs', label: 'docs' },
  { command: 'mcpkit check-env --json', label: 'check-env' },
  { command: 'mcpkit completions --install', label: 'completions' },
];

const templates = [
  {
    title: 'basic',
    subtitle: 'stdio',
    badge: 'stage 1',
    description: 'Start fast, learn the MCP shape, and run locally with the fewest moving parts.',
    files: ['src/index.ts', '.vscode/mcp.json'],
  },
  {
    title: 'http',
    subtitle: 'Streamable HTTP',
    badge: 'stage 2',
    description: 'Expose an HTTP MCP endpoint with home and health routes on port 3100.',
    files: ['src/index.ts', '.vscode/mcp.json'],
  },
  {
    title: 'auth',
    subtitle: 'HTTP + bearer auth',
    badge: 'stage 3',
    description: 'Protect /mcp with bearer-token verification and a separate auth helper.',
    files: ['src/index.ts', 'src/auth.ts', '.vscode/mcp.json'],
  },
  {
    title: 'full',
    subtitle: 'HTTP + auth + ops',
    badge: 'stage 4',
    description: 'Add metrics, structured logging, health checks, linting, and formatting config.',
    files: ['src/index.ts', 'src/auth.ts', 'src/logger.ts', 'src/health.ts', 'src/metrics.ts'],
  },
];

const checkItems = [
  { title: 'Interactive setup', text: 'The init command guides you through project name, template, transport, package manager, and optional features. Accept defaults with --yes for instant scaffolding.' },
  { title: 'Generated project structure', text: 'Each template produces a complete, runnable project with package scripts, TypeScript config, and version control files. No manual wiring required.' },
  { title: 'Inspector integration', text: 'mcpkit dev --inspect opens the official MCP Inspector — no custom debugging layer invented.' },
  { title: 'Dev workflow', text: 'Generated projects include watch-mode scripts and a dev command with inspector and test-watcher helpers built in.' },
  { title: 'Client config', text: 'Templates generate .vscode/mcp.json so MCP clients discover your server automatically.' },
  { title: 'Package manager detection', text: 'The ship command detects your package manager from the lock file and uses the correct publish command — npm, pnpm, or bun.' },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="pt-20">
        {/* Hero — centered panel-in-halo */}
        <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-8">
          <div className="hero-halo absolute inset-0 -z-10" />
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[1.25rem] border border-[var(--border)]/70 bg-[var(--card)]/75 p-4 shadow-2xl shadow-zinc-950/10 backdrop-blur dark:bg-zinc-950/75 dark:shadow-black/30 sm:p-8 lg:p-12">
              <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--primary)] shadow-sm dark:text-[var(--signal-strong)]">
                  <Terminal className="size-3.5" />
                  MCP server generator CLI
                </span>
                <h1 className="max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight text-[var(--foreground)] sm:text-6xl lg:text-7xl">
                  Build{' '}
                  <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-violet-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-cyan-300 dark:to-violet-400">
                    MCP servers
                  </span>
                  {' '}with the workflow already wired in.
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                  {site.tagline}{' '}
                  <span className="font-medium text-[var(--foreground)]/80">Scaffold, develop, test, validate, diagnose, document, build, and ship</span>{' '}
                  from one toolkit instead of assembling the workflow yourself.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <ButtonLink href={site.quickStartUrl}>
                    Get started
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink href="/docs/cli" variant="secondary">
                    CLI commands
                  </ButtonLink>
                </div>
                <div className="mt-10 flex flex-wrap justify-center gap-3 text-xs font-medium text-[var(--muted-foreground)]">
                  {['4 templates', '10 CLI commands', 'bun · npm · pnpm'].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--background)]/70 px-3 py-1.5"
                    >
                      <Check className="size-3.5 text-[var(--primary)]" />
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-14 w-full">
                  <HeroDemo />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLI workflow cards */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div className="max-w-3xl space-y-3">
                <SectionLabel>Commands this repo actually ships</SectionLabel>
                <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                  Every command, option, and preview here is derived from the current repository.
                </h2>
                <p className="text-base leading-7 text-[var(--muted-foreground)]">
                  The CLI is the main product. These are the commands you run every day.
                </p>
              </div>
              <ButtonLink href="/docs/cli" variant="secondary">
                Read the docs
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {commands.map(({ command, label }) => (
                <CommandBlock key={label} label={label} command={command} />
              ))}
            </div>
          </div>
        </section>

        {/* Create-flow 2-col band */}
        <section className="border-y border-[var(--border)] bg-[var(--muted)]/20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8">
            <div className="space-y-4">
              <SectionLabel>The create flow is the main product</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                One command to scaffold, configure, and run.
              </h2>
              <p className="text-base leading-8 text-[var(--muted-foreground)]">
                mcpkit init asks the right questions and writes a runnable project. You choose the template, package manager, and project name — the rest is wired for you.
              </p>
              <CommandBlock label="create" command={quickStartCreateCommand} />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {checkItems.map((item) => (
                <div key={item.title} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4">
                  <div className="mb-1.5 text-sm font-semibold text-[var(--foreground)]">{item.title}</div>
                  <p className="text-sm leading-6 text-[var(--muted-foreground)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Templates grid */}
        <section id="templates">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-3">
              <SectionLabel>Templates</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                Pick the template before scaffolding.
              </h2>
              <p className="text-base leading-8 text-[var(--muted-foreground)]">
                Each template adds a verified layer of capability. Start minimal and upgrade when needed.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {templates.map((template) => (
                <article key={template.title} className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">{template.badge}</span>
                    <span className="rounded-full border border-[var(--border)] bg-[var(--background)] px-2.5 py-1 text-xs font-mono text-[var(--foreground)]">{template.subtitle}</span>
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-[var(--foreground)]">{template.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{template.description}</p>
                  <ul className="mt-4 space-y-1.5">
                    {template.files.map((file) => (
                      <li key={file} className="font-mono text-xs text-[var(--muted-foreground)]">{file}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Start band */}
        <section className="border-y border-[var(--border)] bg-[var(--muted)]/20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <div className="space-y-4">
              <SectionLabel>Quick Start</SectionLabel>
              <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                The shortest reliable path to a working MCP server.
              </h2>
              <p className="text-base leading-8 text-[var(--muted-foreground)]">
                This path uses the current package name and an explicit npm package-manager choice, so it remains usable even if you do not have Bun installed yet.
              </p>
              <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-5">
                <div className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">what happens</div>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" /> installs the published CLI package</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" /> scaffolds the verified basic template</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" /> installs dependencies automatically with --yes</li>
                  <li className="flex items-start gap-2"><Check className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" /> starts the generated server with npm run dev</li>
                </ul>
              </div>
              <ButtonLink href={site.quickStartUrl} variant="secondary">
                Open the full Quick Start guide
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
            <div className="space-y-4">
              <CommandBlock label="install" command={installCommand} />
              <CommandBlock label="create" command={quickStartCreateCommand} />
              <CommandBlock label="develop" command={'cd hello-mcp && npm run dev'} />
            </div>
          </div>
        </section>

        {/* MVP / roadmap + changelog CTA */}
        <section>
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="mb-10 max-w-3xl space-y-3">
                <SectionLabel>MVP scope is intentional</SectionLabel>
                <h2 className="text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
                  Start with MCP structure, not auth or database opinions.
                </h2>
                <p className="text-base leading-8 text-[var(--muted-foreground)]">
                  The current CLI generates simple request handlers, modules, docs, config, and project scaffolds. Auth, databases, ORMs, and other infrastructure are planned for future iterations.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { title: 'What mcpkit does now', items: ['Project scaffolding with 4 verified templates', 'Development workflow with dev, test, build, ship commands', 'Validation and diagnostics', 'Client config generation', 'Shell completions'] },
                  { title: 'Roadmap', items: ['Auth and bearer token verification', 'Database and ORM integration', 'Structured logging and metrics', 'Docker and deployment configs', 'Extended validation protocols'] },
                ].map((col) => (
                  <div key={col.title} className="rounded-lg border border-[var(--border)] bg-[var(--muted)]/30 p-5">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">{col.title}</h3>
                    <ul className="space-y-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-6 text-[var(--muted-foreground)]">
                          <Check className="mt-0.5 size-4 shrink-0 text-[var(--primary)]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-6">
                <div className="space-y-1">
                  <div className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">Latest changelog</div>
                  <p className="text-sm text-[var(--muted-foreground)]">0.2.0 — Landing page redesign, CSS fixes, custom domain deployment.</p>
                </div>
                <ButtonLink href={site.changelogUrl} variant="secondary">
                  View full changelog
                  <ArrowRight className="size-4" />
                </ButtonLink>
              </div>
            </div>
            <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                  <SectionLabel>Final CTA</SectionLabel>
                  <h2 className="text-2xl font-semibold tracking-normal text-[var(--foreground)] sm:text-3xl">
                    Understand it. Try it. Keep going in the docs.
                  </h2>
                  <p className="max-w-3xl text-base leading-8 text-[var(--muted-foreground)]">
                    The shortest path starts with the install command, continues through Quick Start, and stays grounded in the repository-backed docs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href={site.quickStartUrl}>
                    Get started
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={site.npmUrl} variant="secondary" external>
                    <PackageSearch className="size-4" />
                    npm
                  </ButtonLink>
                  <ButtonLink href={site.githubUrl} variant="secondary" external>
                    <GitBranch className="size-4" />
                    GitHub
                  </ButtonLink>
                  <ButtonLink href={site.githubStarUrl} variant="secondary" external>
                    <Star className="size-4" />
                    Star
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}