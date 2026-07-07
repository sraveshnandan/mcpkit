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
- Public web deployment-prep pass completed in `apps/web`; hero, SEO, static search, and GitHub Pages readiness are ready for review.

## Completed
- Created a unified Next.js public app in `apps/web`
- Integrated Fumadocs into the shared public app instead of a separate docs-only package
- Added a shared visual system with command/terminal-driven landing-page design language
- Added shared navigation, footer, typography, command blocks, and terminal UI primitives
- Built landing page sections for hero, problem framing, workflow, command explorer, templates, DX, generated project structure, Quick Start, docs bridge, open source, FAQ, and final CTA
- Built documentation routes and content for introduction, getting started, concepts, CLI reference, templates, guides, examples, troubleshooting, FAQ, and changelog
- Added search, metadata, sitemap, robots, and Open Graph coverage for the public site
- Updated workspace configuration so `apps/web` participates in monorepo typecheck/build flows
- Fixed CLI help/version tests to use `bunx tsx` so they pass reliably in the Bun workspace
- Refreshed the public site with a violet-first visual system, a more polished interactive hero, an accordion FAQ experience, and an upgraded docs Quick Start guide
- Fixed the shared Quick Start route to point to the working `/docs/quick-start` page
- Reduced hero congestion by simplifying the command-demo composition and switching the header to a floating container style
- Added subtle reduced-motion-safe entrance/hover motion and switched temporary branding to an `M` text mark with matching favicon
- Shortened the hero copy to improve scanability and added GitHub star CTAs in the header, footer, and docs navigation
- Replaced API-backed docs search with a static exported search index so search works on GitHub Pages
- Added GitHub Pages export support, env-aware site/base-path configuration, `.nojekyll`, static OG assets, and a GitHub Actions Pages deployment workflow
- Added structured data and expanded SEO metadata for deployment readiness

## In Progress
- None

## Remaining
- Manual browser QA for final visual polish and responsive review before publishing the GitHub Pages deployment
- Optional README alignment work if the repository README should be brought fully in line with the verified public site copy

## Notes
- The public site uses the repository as the source of truth, including current caveats such as heuristic validation, `.vscode/mcp.json` as the only generated client config, and the current auth-template limitations
- `apps/web` is the canonical location for future landing-page and docs work

## Next Exact Task
1. Review the updated public site locally in a browser, especially hero spacing and the static docs search experience
2. Push the branch and enable GitHub Pages so `.github/workflows/deploy-pages.yml` can publish `apps/web/out`
3. If desired, run one final README-alignment pass after deployment review