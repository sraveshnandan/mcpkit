# mcpkit Launch Kit

## Twitter/X Thread

### Tweet 1 (Hook)
Building MCP servers is tedious.

Created mcpkit — the create-next-app for MCP servers.

One command to scaffold, test, validate, and ship.

30 seconds from zero to running server 🧵

### Tweet 2 (Problem)
The MCP SDK gives you an entry file.

But you still need:
- Project structure
- Transport wiring
- Testing setup
- Validation
- Build & publish flow
- Client config

That's the gap mcpkit fills.

### Tweet 3 (Solution)
mcpkit init does everything:

```
npm install -g mcpkit-cli
mcpkit init hello-mcp --template basic --package-manager npm --yes
cd hello-mcp && npm run dev
```

Working MCP server in 30 seconds.

### Tweet 4 (Templates)
4 templates for different needs:

• basic — stdio, minimal, learn the shape
• http — Streamable HTTP endpoint
• auth — HTTP + bearer token verification
• full — logging, metrics, health checks, linting

Start simple, upgrade when ready.

### Tweet 5 (Commands)
10 CLI commands covering the full workflow:

• init — scaffold
• dev — hot reload + inspector
• test — run Vitest
• validate — check MCP structure
• doctor — diagnose issues
• build — compile
• ship — publish

### Tweet 6 (DX Features)
Developer experience details:

• Shell completions (bash/zsh/fish)
• check-env validates your setup
• --yes flag for non-interactive mode
• Generates .vscode/mcp.json
• Official MCP Inspector integration

### Tweet 7 (Social Proof)
Built and verified against real projects:

• 4 templates tested end-to-end
• 25+ tests passing
• TypeScript strict mode
• Node 18+ required

Open source: github.com/sraveshnandan/mcpkit

### Tweet 8 (CTA)
Try it now:

📦 npm: npm install -g mcpkit-cli
🌐 Docs: mcpkit.js.org
⭐ GitHub: github.com/sraveshnandan/mcpkit

Star the repo if you find it useful!

---

## Hacker News Post

**Title:** Show HN: mcpkit – The create-next-app for MCP servers

**URL:** https://github.com/sraveshnandan/mcpkit

**Body:**

Hi HN,

I built mcpkit because setting up MCP servers from scratch was repetitive.

The MCP SDK gives you an entry file, but you still need project structure, transport wiring, testing, validation, build/publish flow, and client config.

mcpkit does all of this in one command:

```
npm install -g mcpkit-cli
mcpkit init hello-mcp --template basic --package-manager npm --yes
```

Features:
- 4 templates (basic, http, auth, full)
- 10 CLI commands (init, dev, build, test, validate, doctor, ship, etc.)
- Shell completions for bash/zsh/fish
- MCP Inspector integration
- Generates .vscode/mcp.json for client config

Website: https://mcpkit.js.org
npm: https://www.npmjs.com/package/mcpkit-cli

Would love feedback on what's missing or could be better.

---

## Dev.to Article

# Build MCP Servers in 30 Seconds with mcpkit

The Model Context Protocol (MCP) is becoming the standard for connecting AI assistants to external tools. But setting up an MCP server from scratch involves a lot of boilerplate.

I created **mcpkit** to solve this — think of it as create-next-app, but for MCP servers.

## What is mcpkit?

mcpkit is a CLI toolkit that scaffolds, develops, tests, validates, and ships TypeScript MCP servers. It handles the entire workflow so you can focus on building tools.

## Quick Start

```bash
# Install
npm install -g mcpkit-cli

# Create a project
mcpkit init hello-mcp --template basic --package-manager npm --yes

# Run it
cd hello-mcp
npm run dev
```

That's it. You have a working MCP server with a sample `greet` tool.

## 4 Templates

| Template | Transport | Use Case |
|----------|-----------|----------|
| basic | stdio | Learning, local tools |
| http | Streamable HTTP | Remote servers |
| auth | HTTP + bearer auth | Protected endpoints |
| full | HTTP + auth + ops | Production-ready |

## 10 CLI Commands

- `mcpkit init` — Scaffold new project
- `mcpkit dev` — Hot reload + inspector
- `mcpkit build` — Compile for production
- `mcpkit test` — Run tests
- `mcpkit validate` — Check MCP structure
- `mcpkit doctor` — Diagnose issues
- `mcpkit ship` — Build and publish
- `mcpkit docs` — Generate documentation
- `mcpkit check-env` — Validate environment
- `mcpkit completions` — Shell completions

## Why mcpkit?

The MCP SDK provides the primitives. mcpkit provides the workflow:

1. **Scaffolding** — No more copy-pasting boilerplate
2. **Development** — Hot reload, inspector integration
3. **Testing** — Vitest setup included
4. **Validation** — Catch mistakes before runtime
5. **Shipping** — Build and publish in one step

## Links

- Website: [mcpkit.js.org](https://mcpkit.js.org)
- GitHub: [github.com/sraveshnandan/mcpkit](https://github.com/sraveshnandan/mcpkit)
- npm: [mcpkit-cli](https://www.npmjs.com/package/mcpkit-cli)

---

## Reddit Posts

### r/mcp

**Title:** mcpkit — The create-next-app for MCP servers

**Body:**

Built a CLI toolkit that scaffolds, tests, validates, and ships MCP servers.

```
npm install -g mcpkit-cli
mcpkit init hello-mcp --template basic --package-manager npm --yes
```

4 templates (basic, http, auth, full) and 10 CLI commands covering the full workflow.

Docs: https://mcpkit.js.org
GitHub: https://github.com/sraveshnandan/mcpkit

### r/typescript

**Title:** mcpkit — TypeScript CLI for building MCP servers

**Body:**

Created a CLI toolkit for Model Context Protocol servers. Handles scaffolding, development, testing, validation, and publishing.

```bash
npm install -g mcpkit-cli
mcpkit init my-server --template http --package-manager npm --yes
```

Open source, TypeScript strict mode, Node 18+.

GitHub: https://github.com/sraveshnandan/mcpkit

---

## Sharing Checklist

- [ ] Post Twitter thread
- [ ] Submit to Hacker News
- [ ] Post on r/mcp
- [ ] Post on r/typescript
- [ ] Write Dev.to article
- [ ] Share in MCP Discord
- [ ] Update LinkedIn
- [ ] Email relevant newsletters
