import type { TemplateConfig, TemplateVars } from '../../types.js';

const generatePackageJson = (vars: TemplateVars) => `{
  "name": "${vars.name}",
  "version": "0.1.0",
  "description": "${vars.description}",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/",
    "format": "prettier --write src/",
    "validate": "tsc --noEmit && vitest run"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.1",
    "zod": "^3.24.2",
    "express": "^4.21.2",
    "jose": "^6.0.10",
    "pino": "^9.6.0",
    "pino-pretty": "^13.0.0"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "@types/express": "^5.0.0",
    "typescript": "^5.7.3",
    "tsx": "^4.19.2",
    "vitest": "^3.0.4",
    "eslint": "^9.18.0",
    "@typescript-eslint/eslint-plugin": "^8.20.0",
    "@typescript-eslint/parser": "^8.20.0",
    "prettier": "^3.4.2"
  },
  "engines": {
    "node": ">=18"
  }
}`;

const generateTsConfig = () => `{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true,
    "sourceMap": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`;

const generateLoggerTs = () => `import pino from 'pino';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:HH:MM:ss',
      ignore: 'pid,hostname',
    },
  } : undefined,
});

export function createChildLogger(name: string) {
  return logger.child({ module: name });
}
`;

const generateAuthTs = () => `import express from 'express';
import * as jose from 'jose';

export interface AuthConfig {
  issuer: string;
  audience: string;
  jwksUri?: string;
}

export interface AuthenticatedRequest extends express.Request {
  user?: {
    sub: string;
    scope?: string;
    [key: string]: unknown;
  };
}

export class AuthMiddleware {
  private config: AuthConfig;
  private signingKey?: jose.KeyLike;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async initialize(): Promise<void> {
    if (this.config.jwksUri) {
      const JWKS = jose.createRemoteJWKSet(new URL(this.config.jwksUri));
      this.signingKey = await JWKS.get() as jose.KeyLike;
    }
  }

  middleware() {
    return async (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
      const authHeader = req.headers.authorization;
      
      if (!authHeader?.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Missing or invalid authorization header' });
        return;
      }

      const token = authHeader.slice(7);

      try {
        const { payload } = await jose.jwtVerify(token, this.signingKey!, {
          issuer: this.config.issuer,
          audience: this.config.audience,
        });

        req.user = {
          sub: payload.sub,
          scope: payload.scope as string,
          ...payload,
        };

        next();
      } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
      }
    };
  }
}

export function createAuthMiddleware(config: AuthConfig): AuthMiddleware {
  return new AuthMiddleware(config);
}
`;

const generateHealthTs = () => `import express from 'express';
import { createChildLogger } from './logger.js';

const logger = createChildLogger('health');

export interface HealthStatus {
  status: 'ok' | 'degraded' | 'error';
  version: string;
  uptime: number;
  timestamp: string;
  checks?: Record<string, { status: string; message?: string }>;
}

let startTime = Date.now();

export function healthCheck(version: string) {
  return (req: express.Request, res: express.Response) => {
    const status: HealthStatus = {
      status: 'ok',
      version,
      uptime: Math.floor((Date.now() - startTime) / 1000),
      timestamp: new Date().toISOString(),
    };

    logger.debug('Health check requested');
    res.json(status);
  };
}

export function resetStartTime() {
  startTime = Date.now();
}
`;

const generateMetricsTs = () => `import { createChildLogger } from './logger.js';

const logger = createChildLogger('metrics');

interface Metric {
  name: string;
  value: number;
  labels?: Record<string, string>;
  timestamp: number;
}

class MetricsCollector {
  private metrics: Metric[] = [];
  private counters = new Map<string, number>();
  private histograms = new Map<string, number[]>();

  increment(name: string, labels?: Record<string, string>): void {
    const key = this.getKey(name, labels);
    const current = this.counters.get(key) || 0;
    this.counters.set(key, current + 1);
    
    this.metrics.push({
      name,
      value: current + 1,
      labels,
      timestamp: Date.now(),
    });
  }

  observe(name: string, value: number, labels?: Record<string, string>): void {
    const key = this.getKey(name, labels);
    const values = this.histograms.get(key) || [];
    values.push(value);
    this.histograms.set(key, values);
    
    this.metrics.push({
      name,
      value,
      labels,
      timestamp: Date.now(),
    });
  }

  private getKey(name: string, labels?: Record<string, string>): string {
    if (!labels) return name;
    const sortedLabels = Object.entries(labels).sort(([a], [b]) => a.localeCompare(b));
    return \`\${name}:\${sortedLabels.map(([k, v]) => \`\${k}=\${v}\`).join(',')}\`;
  }

  getMetrics(): Metric[] {
    return this.metrics.slice(-1000); // Last 1000 metrics
  }

  getCounter(name: string): number {
    return this.counters.get(name) || 0;
  }

  getHistogramStats(name: string): { avg: number; min: number; max: number; count: number } | null {
    const values = this.histograms.get(name);
    if (!values || values.length === 0) return null;
    
    return {
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values),
      count: values.length,
    };
  }

  reset(): void {
    this.metrics = [];
    this.counters.clear();
    this.histograms.clear();
  }
}

export const metrics = new MetricsCollector();

export function metricsEndpoint(req: express.Request, res: express.Response) {
  res.json({
    metrics: metrics.getMetrics(),
    counters: Object.fromEntries(metrics['counters']),
  });
}
`;

const generateIndexTs = (vars: TemplateVars) => `#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { z } from 'zod';
import { createAuthMiddleware } from './auth.js';
import { logger, createChildLogger } from './logger.js';
import { healthCheck, resetStartTime } from './health.js';
import { metrics } from './metrics.js';

const app = express();
app.use(express.json());

const serverLogger = createChildLogger('server');

// Auth configuration
const auth = createAuthMiddleware({
  issuer: process.env.AUTH_ISSUER || 'https://auth.example.com',
  audience: process.env.AUTH_AUDIENCE || '${vars.name}',
  jwksUri: process.env.AUTH_JWKS_URI,
});

const server = new McpServer({
  name: '${vars.name}',
  version: '0.1.0',
});

// Example tool with metrics
server.tool(
  'greet',
  'Greet someone by name',
  { name: z.string().describe('Name of the person to greet') },
  async ({ name }) => {
    metrics.increment('tool.greet.calls');
    const start = Date.now();
    
    const result = {
      content: [
        {
          type: 'text' as const,
          text: \`Hello, \${name}! Welcome to \${vars.name}.\`,
        },
      ],
    };
    
    metrics.observe('tool.greet.duration', Date.now() - start);
    return result;
  }
);

// Health check endpoint (no auth required)
app.get('/health', healthCheck('0.1.0'));

// Metrics endpoint (no auth required for internal use)
app.get('/metrics', (req, res) => {
  res.json({
    counters: Object.fromEntries(metrics['counters']),
    timestamp: new Date().toISOString(),
  });
});

// MCP endpoint (auth required)
app.post('/mcp', auth.middleware(), async (req, res) => {
  metrics.increment('mcp.requests');
  const start = Date.now();
  
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });
    
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    
    metrics.observe('mcp.duration', Date.now() - start);
  } catch (error) {
    metrics.increment('mcp.errors');
    serverLogger.error({ error }, 'MCP request failed');
    throw error;
  }
});

const PORT = process.env.PORT || 3000;

async function main() {
  resetStartTime();
  await auth.initialize();
  
  app.listen(PORT, () => {
    serverLogger.info({ port: PORT }, '${vars.name} MCP server started');
    serverLogger.info(\`MCP endpoint: http://localhost:\${PORT}/mcp\`);
    serverLogger.info(\`Health check: http://localhost:\${PORT}/health\`);
    serverLogger.info(\`Metrics: http://localhost:\${PORT}/metrics\`);
  });
}

main().catch((error) => {
  serverLogger.fatal({ error }, 'Fatal error');
  process.exit(1);
});
`;

const generateGitignore = () => `node_modules/
dist/
.env
.env.local
*.log
.DS_Store
coverage/
`;

const generateEslintConfig = () => `import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
);
`;

const generatePrettierConfig = () => `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}`;

const generateReadme = (vars: TemplateVars) => `# ${vars.name}

${vars.description}

## Features

- 🔐 OAuth 2.1 authentication
- 🌐 Streamable HTTP transport
- 📝 MCP protocol support
- 📊 Built-in metrics
- 🏥 Health checks
- 📝 Structured logging
- 🛡️ ESLint + Prettier

## Development

\`\`\`bash
# Install dependencies
${vars.packageManager} install

# Set environment variables
export AUTH_ISSUER=https://auth.example.com
export AUTH_AUDIENCE=${vars.name}
export AUTH_JWKS_URI=https://auth.example.com/.well-known/jwks.json
export LOG_LEVEL=debug

# Start development server
${vars.packageManager} run dev

# Build for production
${vars.packageManager} run build

# Run tests
${vars.packageManager} run test

# Validate (typecheck + test)
${vars.packageManager} run validate

# Lint and format
${vars.packageManager} run lint
${vars.packageManager} run format
\`\`\`

## API Endpoints

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| \`/mcp\` | POST | ✅ | MCP protocol endpoint |
| \`/health\` | GET | ❌ | Health check |
| \`/metrics\` | GET | ❌ | Metrics |

## Authentication

This server requires OAuth 2.1 Bearer tokens. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-token>
\`\`\`

## Usage

### VS Code

Add to \`.vscode/mcp.json\`:

\`\`\`json
{
  "servers": {
    "${vars.name}": {
      "type": "http",
      "url": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer \${env:AUTH_TOKEN}"
      }
    }
  }
}
\`\`\`

### Claude Desktop

Add to \`claude_desktop_config.json\`:

\`\`\`json
{
  "mcpServers": {
    "${vars.name}": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "Authorization": "Bearer \${env:AUTH_TOKEN}"
      }
    }
  }
}
\`\`\`

## Project Structure

\`\`\`
src/
├── index.ts      # Main server entry
├── auth.ts       # OAuth 2.1 middleware
├── logger.ts     # Structured logging
├── health.ts     # Health check endpoint
└── metrics.ts    # Metrics collector
\`\`\`

## License

MIT © ${vars.year} ${vars.author || vars.name}
`;

const generateLicense = (vars: TemplateVars) => `MIT License

Copyright (c) ${vars.year} ${vars.author || vars.name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

const generateVscodeMcp = (vars: TemplateVars) => JSON.stringify({
  servers: {
    [vars.name]: {
      type: 'http',
      url: 'http://localhost:3000/mcp',
      headers: {
        Authorization: 'Bearer ${env:AUTH_TOKEN}',
      },
    },
  },
}, null, 2) + '\n';

export const fullTemplate: TemplateConfig = {
  name: 'full',
  description: 'Production-ready MCP server with all features',
  hint: 'Enterprise-grade with auth, logging, metrics',
  icon: '🚀',
  files: [
    { path: 'package.json', content: (vars) => generatePackageJson(vars) },
    { path: 'tsconfig.json', content: () => generateTsConfig() },
    { path: 'src/index.ts', content: (vars) => generateIndexTs(vars) },
    { path: 'src/auth.ts', content: () => generateAuthTs() },
    { path: 'src/logger.ts', content: () => generateLoggerTs() },
    { path: 'src/health.ts', content: () => generateHealthTs() },
    { path: 'src/metrics.ts', content: () => generateMetricsTs() },
    { path: '.gitignore', content: () => generateGitignore() },
    { path: 'README.md', content: (vars) => generateReadme(vars) },
    { path: 'LICENSE', content: (vars) => generateLicense(vars) },
    { path: '.vscode/mcp.json', content: (vars) => generateVscodeMcp(vars) },
    { path: 'eslint.config.js', content: () => generateEslintConfig() },
    { path: '.prettierrc', content: () => generatePrettierConfig() },
  ],
  dependencies: {
    '@modelcontextprotocol/sdk': '^1.12.1',
    'zod': '^3.24.2',
    'express': '^4.21.2',
    'jose': '^6.0.10',
    'pino': '^9.6.0',
    'pino-pretty': '^13.0.0',
  },
  devDependencies: {
    '@types/node': '^22.10.5',
    '@types/express': '^5.0.0',
    'typescript': '^5.7.3',
    'tsx': '^4.19.2',
    'vitest': '^3.0.4',
    'eslint': '^9.18.0',
    '@typescript-eslint/eslint-plugin': '^8.20.0',
    '@typescript-eslint/parser': '^8.20.0',
    'prettier': '^3.4.2',
  },
  scripts: {
    'dev': 'tsx watch src/index.ts',
    'build': 'tsc',
    'start': 'node dist/index.js',
    'test': 'vitest run',
    'test:watch': 'vitest',
    'typecheck': 'tsc --noEmit',
    'lint': 'eslint src/',
    'format': 'prettier --write src/',
    'validate': 'tsc --noEmit && vitest run',
  },
};
