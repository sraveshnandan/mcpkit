# mcpkit — Progress Tracker

## Current Status
- **Phase:** CLI Implementation
- **Last Updated:** 2025-01-11
- **Current Task:** v1.0 Complete - Ready for landing page and docs

## Completed

### Phase 1: Monorepo Foundation
- [x] Root package.json with Bun workspaces
- [x] tsconfig.base.json (strict mode, ESM)
- [x] Root tsconfig.json with references
- [x] .gitignore
- [x] Git initialized with conventional commits

### Phase 2: CLI Package Setup
- [x] packages/cli/package.json
- [x] packages/cli/tsconfig.json
- [x] packages/cli/tsup.config.ts
- [x] bin/mcpkit.ts entry point
- [x] src/index.ts main program with Commander.js

### Phase 3: CLI Utilities
- [x] src/utils/logger.ts (picocolors)
- [x] src/utils/spinner.ts (ora)
- [x] src/utils/prompts.ts (@clack/prompts)
- [x] src/utils/exec.ts (execa)
- [x] src/types.ts
- [x] src/errors.ts

### Phase 4: Commands
- [x] src/commands/init.ts — Interactive setup wizard
- [x] src/commands/dev.ts — Development server with tsx watch
- [x] src/commands/validate.ts — MCP schema validation
- [x] src/commands/build.ts — Production build pipeline
- [x] src/commands/test.ts — Test runner (vitest)
- [x] src/commands/docs.ts — Documentation generator
- [x] src/commands/check-env.ts — Environment check
- [x] src/commands/ship.ts — Publish to npm
- [x] src/commands/index.ts — Barrel export

### Phase 5: Tests
- [x] vitest.config.ts
- [x] tests/commands/cli.test.ts — CLI help/version tests
- [x] tests/commands/check-env.test.ts — Environment check tests

## In Progress
- [ ] None - v1.0 CLI complete

## Remaining
- [ ] Phase 6: Documentation site (Fumadocs)
- [ ] Phase 7: Landing page (Next.js)

## Project Structure
```
mcpkit/
├── package.json              # Root monorepo config
├── tsconfig.base.json        # Shared TypeScript config
├── tsconfig.json             # Root references
├── .gitignore
├── context.md                # Project context
├── tracker.md                # This file
├── packages/
│   └── cli/
│       ├── package.json
│       ├── tsconfig.json
│       ├── tsup.config.ts
│       ├── vitest.config.ts
│       ├── bin/
│       │   └── mcpkit.ts     # Entry point
│       ├── src/
│       │   ├── index.ts      # Main program
│       │   ├── types.ts
│       │   ├── errors.ts
│       │   ├── commands/
│       │   │   ├── index.ts
│       │   │   ├── init.ts
│       │   │   ├── dev.ts
│       │   │   ├── validate.ts
│       │   │   ├── build.ts
│       │   │   ├── test.ts
│       │   │   ├── docs.ts
│       │   │   ├── check-env.ts
│       │   │   └── ship.ts
│       │   └── utils/
│       │       ├── logger.ts
│       │       ├── spinner.ts
│       │       ├── prompts.ts
│       │       └── exec.ts
│       └── tests/
│           └── commands/
│               ├── cli.test.ts
│               └── check-env.test.ts
```

## Key Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2025-01-11 | Use tsup over tsc | Single bundled output, faster CLI |
| 2025-01-11 | Drop shared package | Premature abstraction, add later |
| 2025-01-11 | Use tsx watch for dev | Battle-tested, native TypeScript |
| 2025-01-11 | String templates | Simple, no external deps needed |
| 2025-01-11 | Commander.js | Zero deps, fluent API, auto help |
| 2025-01-11 | picocolors | 14x smaller than chalk, fast |
| 2025-01-11 | @clack/prompts | Beautiful, used by Vite/Astro |

## Dependencies Status
### CLI Package (@mcpkit/cli)
- commander: ^12.1.0
- picocolors: ^1.1.1
- ora: ^8.1.1
- @clack/prompts: ^0.9.1
- execa: ^9.5.2

### Dev Dependencies
- @types/node: ^22.10.5
- typescript: ^5.7.3
- tsup: ^8.3.6
- tsx: ^4.19.2
- vitest: ^3.0.4

## Current Blockers
- None

## Next Steps
1. Build documentation site with Fumadocs
2. Create landing page with Next.js
3. Add more templates (Python, etc.)
4. Add Docker support
5. Add CI/CD workflows
