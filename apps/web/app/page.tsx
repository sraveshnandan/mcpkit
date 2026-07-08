import Link from 'next/link';
import {
  ArrowRight,
  Bug,
  CircleAlert,
  Command,
  GitBranch,
  PackageSearch,
  Radar,
  SearchCode,
  ShieldCheck,
  Terminal,
  TestTube2,
  Wrench,
} from 'lucide-react';

import { CommandExplorer } from '@/components/command-explorer';
import { FaqGrid } from '@/components/faq-grid';
import { HeroDemo } from '@/components/hero-demo';
import { ProjectStructureView } from '@/components/project-structure-view';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { TemplateJourney } from '@/components/template-journey';
import { ButtonLink } from '@/components/ui/button-link';
import { CommandBlock } from '@/components/ui/command-block';
import { PipelineRail } from '@/components/ui/pipeline-rail';
import { SectionLabel } from '@/components/ui/section-label';
import { installCommand, quickStartCreateCommand, site } from '@/lib/site';

const workflow = ['init', 'dev', 'test', 'validate', 'doctor', 'build', 'ship'];

const fragmentation = [
  ['Project setup', 'Create files, package scripts, and the first entry point yourself.'],
  ['Transport wiring', 'Choose stdio or HTTP and connect transport details correctly.'],
  ['Validation', 'Catch obvious mistakes before runtime and editor integration.'],
  ['Diagnostics', 'Check environment, SDK presence, structure, and config files.'],
  ['Client configuration', 'Add working MCP client config instead of starting from scratch.'],
  ['Release flow', 'Run tests, build, bump versions, and publish consistently.'],
] as const;

const experience = [
  {
    title: 'Development workflow',
    body: 'The generated projects come with watch-mode scripts, and the CLI exposes a `dev` command with inspector and test-watcher helpers.',
    icon: Terminal,
  },
  {
    title: 'Testing and validation',
    body: 'Use the generated Vitest scripts, `mcpkit test`, and `mcpkit validate` for quick checks from the terminal.',
    icon: TestTube2,
  },
  {
    title: 'Diagnostics',
    body: '`check-env` and `doctor` cover environment readiness, project structure, SDK presence, and MCP config discovery.',
    icon: SearchCode,
  },
  {
    title: 'Inspector and debugging',
    body: '`mcpkit dev --inspect` links to the official MCP Inspector instead of inventing another local debugging layer.',
    icon: Radar,
  },
  {
    title: 'Build and ship',
    body: '`build` and `ship` keep the release path close to the rest of the toolkit instead of leaving production steps disconnected.',
    icon: ShieldCheck,
  },
  {
    title: 'Shell completions',
    body: 'Generate or install completions for bash, zsh, and fish directly from the CLI.',
    icon: Wrench,
  },
] as const;

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
                  <ButtonLink href={site.githubUrl} variant="secondary" external>
                    GitHub
                    <GitBranch className="size-4" />
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
              <SectionLabel>The problem</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Building the server is only part of the job.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                Raw MCP SDK boilerplate gets you to an entry file. It does not give you a complete
                developer workflow. `mcpkit` is most useful in the gaps around the server itself.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {fragmentation.map(([title, body]) => (
                <article key={title} className="rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                  <div className="mb-3 flex items-center gap-3 text-sm font-medium text-[var(--ink)]">
                    <CircleAlert className="size-4 text-[var(--danger)]" />
                    {title}
                  </div>
                  <p className="text-sm leading-7 text-[var(--muted)]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Unified workflow</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                One toolkit, one command language, one visible path to shipping.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                The commands are designed as a system rather than isolated utilities. You scaffold,
                run, test, validate, diagnose, build, and ship from the same toolchain.
              </p>
            </div>
            <div className="rounded-[2rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-6">
              <PipelineRail items={[...workflow, 'docs', 'check-env', 'completions']} className="bg-transparent border-0 p-0" />
            </div>
          </div>
        </section>

        <section id="cli" className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Interactive command explorer</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Explore the actual CLI surface, not imagined marketing syntax.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                Every command, option, and preview here is derived from the current repository.
              </p>
            </div>
            <CommandExplorer />
          </div>
        </section>

        <section id="templates" className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Templates</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Progress from minimal stdio to a fuller operational baseline.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                The templates are not duplicates. Each one adds a verified layer of capability and generated structure.
              </p>
            </div>
            <TemplateJourney />
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Developer experience</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                More than scaffolding: the surrounding workflow is part of the product.
              </h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {experience.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--bg)]">
                      <Icon className="size-5 text-[var(--transport)]" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--ink)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>Generated project experience</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                See the actual project shape users get after `mcpkit init`.
              </h2>
            </div>
            <ProjectStructureView />
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
                This path uses the current package name and an explicit npm package-manager choice,
                so it remains usable even if you do not have Bun installed yet.
              </p>
              <div className="rounded-[1.5rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5">
                <div className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
                  what happens
                </div>
                <ul className="mt-4 space-y-2 text-sm leading-7 text-[var(--muted)]">
                  <li>• installs the published CLI package</li>
                  <li>• scaffolds the verified `basic` template</li>
                  <li>• installs dependencies automatically in `--yes` mode</li>
                  <li>• starts the generated server with `npm run dev`</li>
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

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="space-y-4">
              <SectionLabel>Documentation bridge</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Learn, reference, and troubleshoot without leaving the product experience.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                The docs live in the same app, use the same visual system, and are written from verified command behavior and generated template output.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Getting Started', href: '/docs/getting-started', icon: Terminal },
                { title: 'CLI Reference', href: '/docs/cli', icon: Command },
                { title: 'Templates', href: '/docs/templates', icon: PackageSearch },
                { title: 'Troubleshooting', href: '/docs/help/troubleshooting', icon: Bug },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5 transition-colors hover:border-[var(--signal)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--line)] bg-[var(--bg)]">
                      <Icon className="size-5 text-[var(--transport)]" />
                    </div>
                    <div className="text-lg font-semibold tracking-tight text-[var(--ink)]">{item.title}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div className="space-y-4">
              <SectionLabel>Open source</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Open repository, visible code, real contribution paths.
              </h2>
              <p className="text-base leading-8 text-[var(--muted)]">
                No invented stats, no fabricated logos, no testimonial theater. Just the repository, the package, contribution docs, and the current roadmap in context.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Source code', href: site.githubUrl, text: 'Browse the monorepo and inspect the CLI source directly.', external: true },
                { title: 'npm package', href: site.npmUrl, text: 'Install the current published package: mcpkit-cli.', external: true },
                { title: 'Contributing', href: 'https://github.com/sraveshnandan/mcpkit/blob/main/CONTRIBUTING.md', text: 'Read contribution guidelines before opening changes.', external: true },
                { title: 'Documentation', href: '/docs', text: 'Move from discovery into reference without leaving the app.', external: false },
              ].map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="rounded-[1.6rem] border border-[var(--line-strong)] bg-[var(--panel-strong)] p-5 transition-colors hover:border-[var(--signal)]"
                  {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className="mb-2 text-lg font-semibold tracking-tight text-[var(--ink)]">{item.title}</div>
                  <p className="text-sm leading-7 text-[var(--muted)]">{item.text}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--line)]">
          <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-3xl space-y-4">
              <SectionLabel>FAQ</SectionLabel>
              <h2 className="font-display text-4xl tracking-[-0.04em] text-[var(--ink)]">
                Adoption questions answered from the current implementation.
              </h2>
            </div>
            <FaqGrid />
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
