# @mcpkit/cli

CLI tool for building, validating, and shipping production-ready MCP servers.

## Installation

```bash
# Install globally
bun install -g @mcpkit/cli

# Or use npx
npx @mcpkit/cli
```

## Commands

### init

Initialize a new MCP server project.

```bash
mcpkit init [name]

# Options:
#   -t, --template <template>    Template to use: basic, http, auth, full (default: basic)
#   -p, --package-manager <pm>   Package manager: bun, npm, pnpm (default: bun)
#   -y, --yes                    Skip prompts and use defaults
```

**Templates:**
- `basic` - Minimal MCP server with stdio transport
- `http` - HTTP transport with Express
- `auth` - HTTP with OAuth 2.1 authentication
- `full` - Production-ready with auth, logging, metrics

### dev

Start development server with hot reload.

```bash
mcpkit dev

# Options:
#   -e, --entry <entry>          Entry file (default: src/index.ts)
#   -t, --transport <transport>  Transport type: stdio, http (default: stdio)
#   -p, --port <port>            Port for HTTP transport (default: 3100)
#   --inspect                    Open MCP Inspector in browser
#   --test                       Run tests on file changes
#   -v, --verbose                Verbose output
```

### build

Build the MCP server for production.

```bash
mcpkit build

# Options:
#   -o, --outDir <outDir>    Output directory (default: dist)
#   --no-clean               Skip cleaning output directory
#   --dry-run                Preview build without executing
#   -v, --verbose            Verbose output
```

### test

Run tests for the MCP server.

```bash
mcpkit test

# Options:
#   -w, --watch       Watch mode
#   --coverage        Enable coverage
#   -v, --verbose     Verbose output
```

### validate

Validate MCP server configuration.

```bash
mcpkit validate

# Options:
#   -f, --file <file>    Config file (default: src/index.ts)
#   -v, --verbose        Verbose output
```

### docs

Generate documentation for the MCP server.

```bash
mcpkit docs

# Options:
#   -o, --outDir <outDir>    Output directory (default: docs)
#   -v, --verbose            Verbose output
```

### check-env

Check development environment setup.

```bash
mcpkit check-env

# Options:
#   --json           Output results as JSON
#   -v, --verbose    Verbose output
```

### doctor

Check project health and diagnose issues.

```bash
mcpkit doctor

# Options:
#   --json           Output results as JSON
#   -v, --verbose    Verbose output
```

### ship

Build and publish the MCP server.

```bash
mcpkit ship

# Options:
#   -b, --bump <bump>    Version bump type: patch, minor, major (default: patch)
#   --dry-run            Preview without publishing
#   -v, --verbose        Verbose output
```

### completions

Generate shell completions for bash, zsh, or fish.

```bash
mcpkit completions <shell>

# Arguments:
#   shell                Shell type: bash, zsh, fish

# Options:
#   --install            Install completions automatically
#   --print              Print to stdout instead of installing
```

## Global Options

```
  -V, --version      Output the version number
  --dry-run          Preview operations without executing
  -v, --verbose      Enable verbose output
  --no-color         Disable colored output
  -h, --help         Display help for command
```

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Test
bun run test

# Type check
bun run typecheck
```

## License

MIT
