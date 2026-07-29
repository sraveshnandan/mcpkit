import { ArrowRight, GitBranch, PackageSearch, Star, Terminal } from 'lucide-react';

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

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8 lg:py-14">
            <div className="grid gap-8 rounded-[2.3rem] border border-[var(--line-strong)] bg-[linear-gradient(180deg,color-mix(in_srgb,var(--signal)_6%,var(--bg-elevated)),var(--bg))] px-5 py-6 shadow-[0_26px_90px_rgba(69,38,137,0.10)] sm:px-7 sm:py-9 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:gap-12 lg:px-8 lg:py-8 xl:gap-14">
              <div className="space-y-6 sm:space-y-8 lg:py-4">
                <SectionLabel>MCP development pipeline</SectionLabel>
                <div className="space-y-5">
                  <h1 className="max-w-[9.2ch] font-display text-[3.6rem] leading-[0.92] tracking-[-0.06em] text-[var(--ink)] sm:text-6xl lg:text-[3.85rem] xl:text-[4.2rem]">
                    Build MCP servers with the workflow already wired in.
                  </h1>
                  <p className="max-w-lg text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8">
                    {site.tagline} Scaffold, develop, test, validate, diagnose, document, build, and ship from one toolkit instead of assembling the workflow yourself.
                  </p>
                </div>
                <CommandBlock label="install" command={installCommand} />
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <ButtonLink href={site.quickStartUrl}>
                    Quick Start
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                </div>
                <div className="flex flex-wrap gap-2 pt-1 sm:pt-2">
                  {['4 templates', '10 CLI commands', 'bun · npm · pnpm'].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <HeroDemo />
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Commands this repo actually ships</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Every command, option, and preview here is derived from the current repository.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                The CLI is the main product. These are the commands you run every day.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {commands.map(({ command, label }) => (
                <CommandBlock key={label} label={label} command={command} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>The create flow is the main product</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                One command to scaffold, configure, and run.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                mcpkit init asks the right questions and writes a runnable project. You choose the template, package manager, and project name — the rest is wired for you.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Interactive setup
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  The init command guides you through project name, template choice, transport, package manager, and optional features like client config. Accept defaults with <span className="font-mono text-sm">--yes</span> for instant scaffolding.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Generated project structure
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Each template produces a complete, runnable project with package scripts, TypeScript config, and version control files. No manual wiring required.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Inspector integration
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  <span className="font-mono text-sm">mcpkit dev --inspect</span> opens the official MCP Inspector — no custom debugging layer invented.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Dev workflow
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Generated projects include watch-mode scripts and a <span className="font-mono text-sm">dev</span> command with inspector and test-watcher helpers built in.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Client config
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Templates generate <span className="font-mono text-sm">.vscode/mcp.json</span> so MCP clients discover your server automatically.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                  Package manager detection
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  The <span className="font-mono text-sm">ship</span> command detects your package manager from the lock file and uses the correct publish command — npm, pnpm, or bun.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Templates</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Pick the template before scaffolding.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                Each template adds a verified layer of capability. Start minimal and upgrade when needed.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {templates.map((template) => (
                <article key={template.title} className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">{template.badge}</span>
                    <span className="rounded-full border border-[var(--line)] bg-[var(--bg)] px-2.5 py-1 text-[0.68rem] font-mono text-[var(--ink)]">{template.subtitle}</span>
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-[var(--ink)]">{template.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{template.description}</p>
                  <ul className="mt-4 space-y-2">
                    {template.files.map((file) => (
                      <li key={file} className="font-mono text-xs text-[var(--muted)]">{file}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Changelog</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                What changed recently.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                This site and the CLI are updated frequently. Here are the latest changes.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full border border-[var(--signal)]/30 bg-[var(--signal)]/10 px-2.5 py-0.5 text-xs font-medium text-[var(--signal-strong)]">latest</span>
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">0.2.0</span>
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Landing page redesign, CommandBlock double-border fix, custom domain deployment fix, footer reorganization.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-[var(--muted)]">0.1.1</span>
                </div>
                <p className="text-sm leading-7 text-[var(--muted)]">
                  Initial CLI release with 4 templates, 10 commands, shell completions, doctor, ship, and js.org deployment.
                </p>
              </div>
            </div>
            <div className="mt-6">
              <ButtonLink href={site.changelogUrl} variant="secondary">
                View full changelog
                <ArrowRight className="size-4" />
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>MVP scope is intentional</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Start with MCP structure, not auth or database opinions.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                The current CLI generates simple request handlers, modules, docs, config, and project scaffolds. Auth, databases, ORMs, and other infrastructure are planned for future iterations.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { title: 'What mcpkit does now', items: ['Project scaffolding with 4 verified templates', 'Development workflow with dev, test, build, ship commands', 'Validation and diagnostics', 'Client config generation', 'Shell completions'] },
                { title: 'Roadmap', items: ['Auth and bearer token verification', 'Database and ORM integration', 'Structured logging and metrics', 'Docker and deployment configs', 'Extended validation protocols'] },
              ].map((col) => (
                <div key={col.title} className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-[0.22em] text-[var(--muted)]">{col.title}</h3>
                  <ul className="space-y-2">
                    {col.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-7 text-[var(--muted)]">
                        <span className="mt-1 text-[var(--signal-strong)]">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8">
            <div className="space-y-4">
              <SectionLabel>Quick Start</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                The shortest reliable path to a working MCP server.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                This path uses the current package name and an explicit npm package-manager choice, so it remains usable even if you do not have Bun installed yet.
              </p>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">what happens</div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
                  <li>• installs the published CLI package</li>
                  <li>• scaffolds the verified basic template</li>
                  <li>• installs dependencies automatically with --yes</li>
                  <li>• starts the generated server with npm run dev</li>
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

        <section>
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="rounded-[2rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-8 md:p-10">
              <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="space-y-4">
                  <SectionLabel>Final CTA</SectionLabel>
                  <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                    Understand it. Try it. Keep going in the docs.
                  </h2>
                  <p className="max-w-3xl text-base leading-8 text-[var(--muted)]">
                    The shortest path starts with the install command, continues through Quick Start, and stays grounded in the repository-backed docs.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <ButtonLink href={site.quickStartUrl}>
                    Quick Start
                    <ArrowRight className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={site.npmUrl} variant="secondary" external>
                    Install package
                    <PackageSearch className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={site.githubUrl} variant="secondary" external>
                    GitHub
                    <GitBranch className="size-4" />
                  </ButtonLink>
                  <ButtonLink href={site.githubStarUrl} variant="secondary" external>
                    Star
                    <Star className="size-4" />
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
