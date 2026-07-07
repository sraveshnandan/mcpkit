# mcpkit

[![npm version](https://img.shields.io/npm/v/mcpkit-cli.svg)](https://www.npmjs.com/package/mcpkit-cli)
[![license](https://img.shields.io/npm/l/mcpkit-cli)](./LICENSE)
[![build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/sraveshnandan/mcpkit)

> **The create-next-app for MCP servers.** Scaffold, develop, validate, and ship production-ready Model Context Protocol servers in seconds.

---

## Quick Start

```bash
# Install mcpkit globally
npm install -g mcpkit-cli

# Create a new MCP server
mcpkit init my-server

# Start development
cd my-server && bun run dev
```

Open [MCP Inspector](https://modelcontextprotocol.io/inspector) to test your server at `http://localhost:3100`.

---

## Features

- **4 battle-tested templates** — Choose from basic, HTTP, auth, or full-stack
- **Zero-config development** — Hot reload, type safety, and automatic restarts
- **Doctor diagnostics** — Verify your environment is ready for MCP development
- **Shell completions** — Tab completion for bash, zsh, and fish
- **Production-ready builds** — Optimized bundles for stdio and HTTP transports
- **MCP Inspector integration** — Test your server with the official MCP Inspector

---

## Templates

| Template | Transport | Features | Use Case |
|----------|-----------|----------|----------|
| `basic` | stdio | Minimal setup, tools, prompts | Getting started, learning |
| `http` | HTTP/SSE | Home page, endpoints, tools | Web integration |
| `auth` | HTTP/SSE | OAuth 2.1, PKCE, token storage | Secure servers |
| `full` | HTTP/SSE | All features combined | Production deployment |

```bash
mcpkit init --template http my-api-server
```

---

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
| `mcpkit doctor` | Run diagnostics |
| `mcpkit completions` | Install shell completions |

### Options

```bash
mcpkit dev --transport http --port 3000
mcpkit check-env --json
mcpkit completions --install
```

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
