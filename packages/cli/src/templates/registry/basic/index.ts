import type { TemplateConfig, TemplateVars } from '../../types.js';

const generatePackageJson = (vars: TemplateVars) => `{
  "name": "${vars.name}",
  "version": "0.1.0",
  "description": "${vars.description}",
  "type": "module",
  "main": "dist/index.js",
  "bin": {
    "${vars.name}": "./dist/index.js"
  },
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit",
    "lint": "eslint src/"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.12.1",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^22.10.5",
    "typescript": "^5.7.3",
    "tsx": "^4.19.2",
    "vitest": "^3.0.4"
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
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"]
}`;

const generateIndexTs = (vars: TemplateVars) => `#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const SERVER_NAME = '${vars.name}';

const server = new McpServer({
  name: SERVER_NAME,
  version: '0.1.0',
});

// Example tool
server.tool(
  'greet',
  'Greet someone by name',
  { name: z.string().describe('Name of the person to greet') },
  async ({ name }) => ({
    content: [
      {
        type: 'text' as const,
        text: \`Hello, \${name}! Welcome to \${SERVER_NAME}.\`,
      },
    ],
  })
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(\`\${SERVER_NAME} MCP server running on stdio\`);
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
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

const generateReadme = (vars: TemplateVars) => `# ${vars.name}

${vars.description}

## Development

\`\`\`bash
# Install dependencies
${vars.packageManager} install

# Start development server
${vars.packageManager} run dev

# Build for production
${vars.packageManager} run build

# Run tests
${vars.packageManager} run test
\`\`\`

## Usage

This MCP server can be used with any MCP-compatible client.

### VS Code

Add to \`.vscode/mcp.json\`:

\`\`\`json
{
  "servers": {
    "${vars.name}": {
      "type": "stdio",
      "command": "node",
      "args": ["./dist/index.js"]
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
      "command": "node",
      "args": ["./dist/index.js"]
    }
  }
}
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
      type: 'stdio',
      command: 'node',
      args: ['./dist/index.js'],
    },
  },
}, null, 2) + '\n';

export const basicTemplate: TemplateConfig = {
  name: 'basic',
  description: 'Minimal MCP server with stdio transport',
  hint: 'Perfect for getting started',
  icon: '⚡',
  files: [
    { path: 'package.json', content: (vars) => generatePackageJson(vars) },
    { path: 'tsconfig.json', content: () => generateTsConfig() },
    { path: 'src/index.ts', content: (vars) => generateIndexTs(vars) },
    { path: '.gitignore', content: () => generateGitignore() },
    { path: 'README.md', content: (vars) => generateReadme(vars) },
    { path: 'LICENSE', content: (vars) => generateLicense(vars) },
    { path: '.vscode/mcp.json', content: (vars) => generateVscodeMcp(vars) },
  ],
  dependencies: {
    '@modelcontextprotocol/sdk': '^1.12.1',
    'zod': '^3.24.2',
  },
  devDependencies: {
    '@types/node': '^22.10.5',
    'typescript': '^5.7.3',
    'tsx': '^4.19.2',
    'vitest': '^3.0.4',
  },
  scripts: {
    'dev': 'tsx watch src/index.ts',
    'build': 'tsc',
    'start': 'node dist/index.js',
    'test': 'vitest run',
    'test:watch': 'vitest',
    'typecheck': 'tsc --noEmit',
  },
};
