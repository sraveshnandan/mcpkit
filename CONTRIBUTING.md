# Contributing to mcpkit

Thanks for your interest in contributing to mcpkit! This guide will help you get started.

---

## Prerequisites

- **Bun** (v1.0+) — [Install Bun](https://bun.sh)
- **Node.js** (v18+) — Required for MCP Inspector
- **Git** — Version control
- **GitHub account** — For creating issues and PRs

---

## Development Setup

### 1. Fork the Repository

Go to [github.com/sraveshnandan/mcpkit](https://github.com/sraveshnandan/mcpkit) and click **Fork**.

### 2. Clone Your Fork

```bash
git clone https://github.com/YOUR_USERNAME/mcpkit.git
cd mcpkit
```

### 3. Install Dependencies

```bash
bun install
```

### 4. Build the Project

```bash
bun run build
```

### 5. Run Tests

```bash
bun run test
```

---

## Project Structure

```
mcpkit/
├── packages/
│   └── cli/
│       └── src/
│           ├── index.ts          # Entry point
│           ├── commands/         # CLI commands
│           ├── templates/        # Project templates
│           │   ├── basic/
│           │   ├── http/
│           │   ├── auth/
│           │   └── full/
│           ├── utils/            # Utility functions
│           ├── types.ts          # Type definitions
│           └── errors.ts         # Error classes
└── package.json                  # Root workspace config
```

---

## Development Workflow

### Working on a Feature

1. Create a branch from `main`:
   ```bash
   git checkout -b feature/my-feature
   ```

2. Make your changes in `packages/cli/src/`

3. Test locally:
   ```bash
   bun run build
   bun run test
   bun run typecheck
   ```

4. Commit your changes with a descriptive message

5. Push to your fork and create a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `docs:` — Documentation changes
- `style:` — Code style changes (formatting, etc.)
- `refactor:` — Code refactoring
- `test:` — Adding or updating tests
- `chore:` — Maintenance tasks

Examples:
```
feat: add custom template support
fix: resolve port conflict on startup
docs: update README with new commands
```

---

## Code Style

- **TypeScript** with strict mode
- **ESM** modules (no CommonJS)
- **picocolors** for terminal colors (not chalk)
- **ora** for spinners
- **@clack/prompts** for interactive prompts
- **vitest** for testing

Run linting:
```bash
bun run lint
```

---

## Testing

### Unit Tests

Located in `packages/cli/src/__tests__/`

```bash
bun run test
```

### E2E Tests

Located in `packages/cli/src/__tests__/e2e/`

```bash
bun run test:e2e
```

### Writing Tests

1. Create test files with `.test.ts` extension
2. Use descriptive test names
3. Follow AAA pattern (Arrange, Act, Assert)

Example:
```typescript
import { describe, it, expect } from 'vitest';
import { validateTemplate } from '../templates';

describe('validateTemplate', () => {
  it('should validate known templates', () => {
    expect(validateTemplate('basic')).toBe(true);
    expect(validateTemplate('unknown')).toBe(false);
  });
});
```

---

## Pull Request Process

1. **Update documentation** if adding new features
2. **Add tests** for new functionality
3. **Ensure all tests pass** before submitting
4. **Fill out the PR template** completely
5. **Link related issues** if applicable

### PR Title

Follow commit convention:
```
feat: add custom template support
```

### PR Description

Include:
- What this PR does
- Why it's needed
- How to test it
- Screenshots (if applicable)

---

## Issue Guidelines

### Bug Reports

Include:
- **Description** — Clear explanation of the bug
- **Steps to reproduce** — Exact steps to trigger the bug
- **Expected behavior** — What should happen
- **Actual behavior** — What actually happens
- **Environment** — OS, Node/Bun version, mcpkit version

### Feature Requests

Include:
- **Problem** — What problem does this solve?
- **Solution** — Your proposed solution
- **Alternatives** — Other solutions considered
- **Context** — Any additional context

---

## Questions?

- Open a [Discussion](https://github.com/sraveshnandan/mcpkit/discussions)
- Check existing [Issues](https://github.com/sraveshnandan/mcpkit/issues)

---

Thank you for contributing!
