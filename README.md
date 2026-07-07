# mcpkit

The definitive developer toolkit for building production-ready MCP servers.

## Overview

mcpkit is the "create-next-app" for the MCP ecosystem. It provides everything you need to build, validate, test, and ship Model Context Protocol servers.

## Packages

| Package | Description |
|---------|-------------|
| [@mcpkit/cli](./packages/cli) | CLI tool for scaffolding and managing MCP servers |

## Quick Start

```bash
# Install mcpkit globally
bun install -g @mcpkit/cli

# Create a new MCP server
mcpkit init my-server

# Navigate to project
cd my-server

# Start development
bun run dev
```

## Commands

| Command | Description |
|---------|-------------|
| `mcpkit init` | Initialize a new MCP server project |
| `mcpkit dev` | Start development server with hot reload |
| `mcpkit build` | Build for production |
| `mcpkit test` | Run tests |
| `mcpkit validate` | Validate MCP configuration |
| `mcpkit docs` | Generate documentation |
| `mcpkit check-env` | Check environment setup |
| `mcpkit ship` | Build and publish to npm |

## Development

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test

# Type check
bun run typecheck
```

## License

MIT
