# mcpkit — Progress Tracker

## Current Status
- **Phase:** CLI Implementation
- **Last Updated:** 2025-07-07
- **Current Task:** v1.1 Complete - Templates, doctor, completions, dev enhancements

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

### Phase 4: Core Commands
- [x] src/commands/init.ts — Interactive setup wizard with template registry
- [x] src/commands/dev.ts — Development server with hot reload, transport options, inspector, test watcher
- [x] src/commands/validate.ts — MCP schema validation
- [x] src/commands/build.ts — Production build pipeline
- [x] src/commands/test.ts — Test runner (vitest)
- [x] src/commands/docs.ts — Documentation generator
- [x] src/commands/check-env.ts — Environment check with JSON output
- [x] src/commands/ship.ts — Publish to npm
- [x] src/commands/doctor.ts — Project health diagnostics
- [x] src/commands/completions.ts — Shell completions (bash/zsh/fish)
- [x] src/commands/index.ts — Barrel export

### Phase 5: Template System
- [x] src/templates/types.ts — Template interfaces and types
- [x] src/templates/index.ts — Template registry and utilities
- [x] src/templates/registry/basic/index.ts — Basic MCP server template
- [x] src/templates/registry/http/index.ts — HTTP transport template
- [x] src/templates/registry/auth/index.ts — Authentication template
- [x] src/templates/registry/full/index.ts — Full-featured template

### Phase 6: Tests
- [x] vitest.config.ts
- [x] tests/commands/cli.test.ts — CLI help/version tests
- [x] tests/commands/check-env.test.ts — Environment check tests
- [x] tests/commands/new-features.test.ts — Doctor, completions, template tests

## In Progress
- [ ] None - v1.1 CLI complete

## Remaining
- [ ] Phase 7: Documentation site (Fumadocs)
- [ ] Phase 8: Landing page (Next.js)

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
│       │   │   ├── ship.ts
│       │   │   ├── doctor.ts
│       │   │   └── completions.ts
│       │   ├── templates/
│       │   │   ├── types.ts
│       │   │   ├── index.ts
│       │   │   └── registry/
│       │   │       ├── basic/index.ts
│       │   │       ├── http/index.ts
│       │   │       ├── auth/index.ts
│       │   │       └── full/index.ts
│       │   └── utils/
│       │       ├── logger.ts
│       │       ├── spinner.ts
│       │       ├── prompts.ts
│       │       └── exec.ts
│       └── tests/
│           └── commands/
│               ├── cli.test.ts
│               ├── check-env.test.ts
│               └── new-features.test.ts
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
| 2025-07-07 | Template system | Variations on same base, feature flags for differences |
| 2025-07-07 | Inspector via link | Link to official MCP Inspector, not local implementation |
| 2025-07-07 | Shell completions | Auto-detect shell, --print flag for stdout |
| 2025-07-07 | Doctor command | Basic checks with extensible architecture for future |

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

## Next Steps
1. Build documentation site with Fumadocs
2. Create landing page with Next.js
3. Add more templates (Python, etc.)
4. Add Docker support
5. Add CI/CD workflows
6. Add more doctor checks (Docker, CI/CD, etc.)
7. Add fish/zsh specific completions enhancements
