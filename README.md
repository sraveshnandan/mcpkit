# mcpkit

[![npm version](https://img.shields.io/npm/v/mcpkit-cli.svg)](https://www.npmjs.com/package/mcpkit-cli)
[![license](https://img.shields.io/npm/l/mcpkit-cli)](./LICENSE)
[![build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/sraveshnandan/mcpkit)

> **The create-next-app for MCP servers.** Build MCP servers with the workflow already wired in.

`mcpkit` is a CLI toolkit for creating and working with TypeScript Model Context Protocol servers. The current repository covers scaffolding, development helpers, testing, validation, diagnostics, lightweight docs generation, builds, publishing, and shell completions.

- Website: [sraveshnandan.github.io/mcpkit](https://sraveshnandan.github.io/mcpkit)
- Documentation: [sraveshnandan.github.io/mcpkit/docs](https://sraveshnandan.github.io/mcpkit/docs)
- npm package: [`mcpkit-cli`](https://www.npmjs.com/package/mcpkit-cli)

---

## Quick Start

This is the shortest broadly compatible path verified against the current implementation.

```bash
# Install the published CLI package
npm install -g mcpkit-cli

# Create a working project with the verified basic template
mcpkit init hello-mcp --template basic --package-manager npm --yes

# Start the generated server
cd hello-mcp
npm run dev
```

What this does today:

- uses the `basic` template
- installs dependencies automatically in `--yes` mode
- generates `.vscode/mcp.json`
- creates a stdio-first MCP server with a `greet` tool

---

## Why mcpkit

Building the server is only part of the work. `mcpkit` gives you the surrounding workflow too.

- **4 templates** — `basic`, `http`, `auth`, and `full`
- **Development workflow** — generated watch-mode scripts plus `mcpkit dev`
- **Testing and validation** — generated Vitest scripts plus `mcpkit test` and `mcpkit validate`
- **Diagnostics** — `check-env` and `doctor` for environment and project checks
- **Shell completions** — bash, zsh, and fish
- **Build and publish flow** — `build` and `ship` for release work
- **Official inspector integration** — `mcpkit dev --inspect` opens the MCP Inspector

---

## Templates

| Template | Transport | Intended use |
|----------|-----------|--------------|
| `basic` | stdio | Learn the MCP shape and start with the fewest moving parts |
| `http` | Streamable HTTP | Build a remote-style MCP server with HTTP routes |
| `auth` | HTTP + bearer auth | Add auth-oriented scaffolding for protected `/mcp` access |
| `full` | HTTP + auth + ops | Start with logging, metrics, health checks, linting, and formatting config |

> Note: the `auth` and `full` templates still need real JWKS-backed configuration for a complete production auth flow.

---

## Commands

| Command | Description |
|---------|-------------|
| `mcpkit init` | Initialize a new MCP server project |
| `mcpkit dev` | Start development server with hot reload |
| `mcpkit build` | Build the MCP server for production |
| `mcpkit test` | Run tests |
| `mcpkit validate` | Validate MCP server configuration |
| `mcpkit docs` | Generate a single `api.md` documentation file |
| `mcpkit check-env` | Check environment setup |
| `mcpkit ship` | Build and publish the MCP server |
| `mcpkit doctor` | Check project health and diagnose issues |
| `mcpkit completions` | Generate or install shell completions |

### Verified examples

```bash
mcpkit init hello-mcp --template basic --package-manager npm --yes
mcpkit dev --transport http --port 3100 --inspect
mcpkit check-env --json
mcpkit completions --install
```

---

## Learn more

- [Quick Start](https://sraveshnandan.github.io/mcpkit/docs/quick-start)
- [CLI reference](https://sraveshnandan.github.io/mcpkit/docs/cli)
- [Templates](https://sraveshnandan.github.io/mcpkit/docs/templates)
- [Troubleshooting](https://sraveshnandan.github.io/mcpkit/docs/help/troubleshooting)

---

## Development

```bash
# Clone the repo
git clone https://github.com/sraveshnandan/mcpkit.git
cd mcpkit

# Install dependencies
bun install

# Build all packages
bun run build

# Run tests
bun run test

# Type check
bun run typecheck
```

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

[MIT](LICENSE) © mcpkit contributors
