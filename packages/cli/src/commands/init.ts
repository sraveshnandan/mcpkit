import { Command } from 'commander';
import pc from 'picocolors';
import * as p from '@clack/prompts';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import type { InitOptions } from '../types.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new MCP server project')
    .argument('[name]', 'Project name')
    .option('-t, --template <template>', 'Template to use', 'typescript')
    .option('-p, --package-manager <pm>', 'Package manager to use', 'bun')
    .action(async (name: string | undefined, options: InitOptions) => {
      await runInit(name, options);
    });
}

async function runInit(name: string | undefined, options: InitOptions): Promise<void> {
  p.intro(pc.cyan('Create your MCP Server'));

  const projectName = name || (await p.text({
    message: 'What is your project name?',
    placeholder: 'my-mcp-server',
    validate: (value) => {
      if (!value) return 'Project name is required';
      if (!/^[a-z][a-z0-9-]*$/.test(value)) {
        return 'Must be lowercase alphanumeric with dashes (e.g., my-mcp-server)';
      }
    },
  })) as string;

  if (p.isCancel(projectName)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const description = await p.text({
    message: 'Project description (optional):',
    placeholder: 'A powerful MCP server',
  }) as string;

  if (p.isCancel(description)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const template = await p.select({
    message: 'Choose a template:',
    options: [
      { value: 'typescript', label: 'TypeScript', hint: 'Full type safety with ESM' },
    ],
  }) as string;

  if (p.isCancel(template)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const packageManager = await p.select({
    message: 'Choose a package manager:',
    options: [
      { value: 'bun', label: 'Bun', hint: 'Fast all-in-one toolkit' },
      { value: 'npm', label: 'npm', hint: 'Default package manager' },
      { value: 'pnpm', label: 'pnpm', hint: 'Fast, disk space efficient' },
    ],
  }) as string;

  if (p.isCancel(packageManager)) {
    p.cancel('Operation cancelled.');
    process.exit(0);
  }

  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    logger.error(`Directory ${projectName} already exists`);
    process.exit(1);
  }

  const spinner = createSpinner('Creating project...').start();

  try {
    await scaffoldProject(projectDir, {
      name: projectName,
      description: description || `A ${projectName} MCP server`,
      template,
      packageManager,
    });

    spinner.succeed('Project created successfully!');

    p.outro(pc.green(`Project ${pc.bold(projectName)} created!\n`));

    logger.log(pc.cyan('Next steps:'));
    logger.log(`  cd ${projectName}`);
    logger.log(`  ${packageManager} install`);
    logger.log(`  ${packageManager} run dev`);
    logger.break();
    logger.log(pc.dim('For more info, visit: https://mcpkit.dev'));
  } catch (err) {
    spinner.fail('Failed to create project');
    logger.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

interface ScaffoldOptions {
  name: string;
  description: string;
  template: string;
  packageManager: string;
}

async function scaffoldProject(projectDir: string, options: ScaffoldOptions): Promise<void> {
  fs.mkdirSync(projectDir, { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'src', 'tools'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'tests'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, '.vscode'), { recursive: true });

  const pkgJson = {
    name: options.name,
    version: '0.1.0',
    description: options.description,
    type: 'module',
    main: 'dist/index.js',
    scripts: {
      dev: 'tsx watch src/index.ts',
      build: 'tsc',
      test: 'vitest run',
      'test:watch': 'vitest',
      start: 'node dist/index.js',
      typecheck: 'tsc --noEmit',
    },
    dependencies: {
      '@modelcontextprotocol/sdk': '^1.12.1',
      zod: '^3.24.2',
    },
    devDependencies: {
      '@types/node': '^22.10.5',
      typescript: '^5.7.3',
      tsx: '^4.19.2',
      vitest: '^3.0.4',
    },
    engines: {
      node: '>=18',
    },
  };

  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(pkgJson, null, 2) + '\n'
  );

  const tsconfigJson = {
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'bundler',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      resolveJsonModule: true,
      outDir: 'dist',
      rootDir: 'src',
      declaration: true,
      sourceMap: true,
    },
    include: ['src'],
    exclude: ['node_modules', 'dist'],
  };

  fs.writeFileSync(
    path.join(projectDir, 'tsconfig.json'),
    JSON.stringify(tsconfigJson, null, 2) + '\n'
  );

  const indexTs = `#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const server = new McpServer({
  name: '${options.name}',
  version: '0.1.0',
});

// Register your tools here
// server.registerTool('tool-name', { ... }, async (args) => { ... });

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('${options.name} MCP server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
`;

  fs.writeFileSync(path.join(projectDir, 'src', 'index.ts'), indexTs);

  const exampleToolTs = `import { z } from 'zod';

export const exampleTool = {
  name: 'example-tool',
  description: 'An example tool',
  inputSchema: z.object({
    input: z.string().describe('Input string'),
  }),
  handler: async ({ input }: { input: string }) => ({
    content: [
      {
        type: 'text' as const,
        text: \`Processed: \${input}\`,
      },
    ],
  }),
};
`;

  fs.writeFileSync(path.join(projectDir, 'src', 'tools', 'example.ts'), exampleToolTs);

  const vscodeMcpJson = {
    servers: {
      [options.name]: {
        type: 'stdio',
        command: 'node',
        args: ['./dist/index.js'],
      },
    },
  };

  fs.writeFileSync(
    path.join(projectDir, '.vscode', 'mcp.json'),
    JSON.stringify(vscodeMcpJson, null, 2) + '\n'
  );

  const gitignore = `node_modules/
dist/
.env
.env.local
*.log
.DS_Store
`;

  fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignore);

  const readmeMd = `# ${options.name}

${options.description}

## Development

\`\`\`bash
# Install dependencies
${options.packageManager} install

# Start development server
${options.packageManager} run dev

# Build for production
${options.packageManager} run build
\`\`\`

## Usage

This MCP server can be used with any MCP-compatible client.

### VS Code

Add the following to \`.vscode/mcp.json\`:

\`\`\`json
{
  "servers": {
    "${options.name}": {
      "type": "stdio",
      "command": "node",
      "args": ["./dist/index.js"]
    }
  }
}
\`\`\`

## License

MIT
`;

  fs.writeFileSync(path.join(projectDir, 'README.md'), readmeMd);

  fs.writeFileSync(path.join(projectDir, 'LICENSE'), `MIT License

Copyright (c) ${new Date().getFullYear()}

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
`);
}
