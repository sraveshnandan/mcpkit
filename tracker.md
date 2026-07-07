## Dependencies Status
### CLI Package (mcpkit-cli)
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
- Public web refinement pass completed in `apps/web`; updated hero composition and temporary branding are ready for review.

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
- Refreshed the public site with a violet-first visual system, a more polished interactive hero, an accordion FAQ experience, and an upgraded docs Quick Start guide
- Fixed the shared Quick Start route to point to the working `/docs/quick-start` page
- Reduced hero congestion by simplifying the command-demo composition and switching the header to a floating container style
- Added subtle reduced-motion-safe entrance/hover motion and switched temporary branding to an `M` text mark with matching favicon

## In Progress
- None

## Remaining
- Manual browser QA for visual polish, mobile review, and any follow-up content refinement after review
- Optional README alignment work if the repository README should be brought fully in line with the verified public site copy

## Notes
- The public site uses the repository as the source of truth, including current caveats such as heuristic validation, `.vscode/mcp.json` as the only generated client config, and the current auth-template limitations
- `apps/web` is the canonical location for future landing-page and docs work

## Next Exact Task
1. Review the updated hero, floating header, and temporary `M` branding in a browser on desktop and mobile
2. Approve or request one more focused visual pass
3. If approved, continue with remaining README alignment or broader final QA