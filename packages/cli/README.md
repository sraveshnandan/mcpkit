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
#   -t, --template <template>    Template to use (default: typescript)
#   -p, --package-manager <pm>   Package manager (default: bun)
```

### dev

Start development server with hot reload.

```bash
mcpkit dev

# Options:
#   -e, --entry <entry>    Entry file (default: src/index.ts)
#   -v, --verbose          Verbose output
```

### build

Build the MCP server for production.

```bash
mcpkit build

# Options:
#   -o, --outDir <outDir>    Output directory (default: dist)
#   --no-clean               Skip cleaning output directory
#   --dry-run                Preview without executing
```

### test

Run tests for the MCP server.

```bash
mcpkit test

# Options:
#   -w, --watch       Watch mode
#   --coverage        Enable coverage
```

### validate

Validate MCP server configuration.

```bash
mcpkit validate

# Options:
#   -f, --file <file>    Config file (default: src/index.ts)
```

### docs

Generate documentation for the MCP server.

```bash
mcpkit docs

# Options:
#   -o, --outDir <outDir>    Output directory (default: docs)
```

### check-env

Check development environment setup.

```bash
mcpkit check-env

# Options:
#   -v, --verbose    Verbose output
```

### ship

Build and publish the MCP server.

```bash
mcpkit ship

# Options:
#   -b, --bump <bump>    Version bump type (default: patch)
#   --dry-run            Preview without publishing
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
