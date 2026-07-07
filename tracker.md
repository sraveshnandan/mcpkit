## Dependencies Status
### CLI Package (@mcpkit/cli)
- commander: ^12.1.0
- picocolors: ^1.1.1
- ora: ^8.1.1
- @clack/prompts: ^0.9.1
- execa: ^9.5.2
- open: ^11.0.0

### Dev Dependencies
- @types/node: ^22.10.5
- typescript: ^5.7.3
- tsup: ^8.3.6
- tsx: ^4.19.2
- vitest: ^3.0.4

## Current Blockers
- None

## Active Task
- Public web experience completed in `apps/web`; final state recorded and awaiting review.

## Completed
- Created a unified Next.js public app in `apps/web`
- Integrated Fumadocs into the shared public app instead of a separate docs-only package
- Added a shared visual system with command/terminal-driven landing-page design language
- Added shared navigation, footer, typography, command blocks, and terminal UI primitives
- Built landing page sections for hero, problem framing, workflow, command explorer, templates, DX, generated project structure, Quick Start, docs bridge, open source, FAQ, and final CTA
- Built documentation routes and content for introduction, getting started, concepts, CLI reference, templates, guides, examples, troubleshooting, FAQ, and changelog
- Added search API, metadata, sitemap, robots, and Open Graph image generation
- Updated workspace configuration so `apps/web` participates in monorepo typecheck/build flows
- Fixed CLI help/version tests to use `bunx tsx` so they pass reliably in the Bun workspace

## In Progress
- None

## Remaining
- Manual browser QA for visual polish, mobile review, and any follow-up content refinement after review
- Optional README alignment work if the repository README should be brought fully in line with the verified public site copy

## Notes
- The public site uses the repository as the source of truth, including current caveats such as heuristic validation, `.vscode/mcp.json` as the only generated client config, and the current auth-template limitations
- `apps/web` is the canonical location for future landing-page and docs work

## Next Exact Task
1. Review `apps/web` in a browser on mobile and desktop
2. Approve or request final polish adjustments
3. If approved, align remaining README copy with the verified site content