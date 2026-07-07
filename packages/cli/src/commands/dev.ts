import { Command } from 'commander';
import pc from 'picocolors';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import open from 'open';
import { logger } from '../utils/logger.js';

interface DevOptions {
  entry: string;
  verbose: boolean;
  transport: 'stdio' | 'http';
  port: number;
  inspect: boolean;
  test: boolean;
}

export function registerDevCommand(program: Command): void {
  program
    .command('dev')
    .description('Start development server with hot reload')
    .option('-e, --entry <entry>', 'Entry file', 'src/index.ts')
    .option('-v, --verbose', 'Verbose output')
    .option('-t, --transport <transport>', 'Transport type (stdio, http)', 'stdio')
    .option('-p, --port <port>', 'Port number for HTTP transport', '3000')
    .option('--inspect', 'Open MCP Inspector in browser')
    .option('--test', 'Run tests on file changes')
    .action(async (options: DevOptions) => {
      await runDev(options);
    });
}

async function runDev(options: DevOptions): Promise<void> {
  const entryPath = path.resolve(process.cwd(), options.entry);

  if (!fs.existsSync(entryPath)) {
    logger.error(`Entry file not found: ${options.entry}`);
    logger.info('Make sure you are in the project root directory.');
    process.exit(1);
  }

  logger.info('Starting development server...');
  logger.break();

  // Set environment variables for transport configuration
  const env = {
    ...process.env,
    NODE_ENV: 'development',
    MCPKIT_TRANSPORT: options.transport,
    MCPKIT_PORT: String(options.port),
  };

  // Build the command
  const args = ['tsx', 'watch', options.entry];
  
  const child = spawn('npx', args, {
    stdio: 'inherit',
    shell: true,
    env,
  });

  // Launch inspector if requested
  if (options.inspect) {
    await launchInspector(options);
  }

  // Start test watcher if requested
  let testProcess: ReturnType<typeof spawn> | null = null;
  if (options.test) {
    testProcess = startTestWatcher();
  }

  child.on('error', (err) => {
    logger.error(`Failed to start dev server: ${err.message}`);
    process.exit(1);
  });

  child.on('close', (code) => {
    if (testProcess) {
      testProcess.kill('SIGINT');
    }
    if (code !== null && code !== 0) {
      logger.error(`Dev server exited with code ${code}`);
      process.exit(code);
    }
  });

  process.on('SIGINT', () => {
    logger.info('Shutting down dev server...');
    if (testProcess) {
      testProcess.kill('SIGINT');
    }
    child.kill('SIGINT');
    process.exit(0);
  });
}

async function launchInspector(options: DevOptions): Promise<void> {
  const inspectorUrl = 'https://modelcontextprotocol.io/inspector';
  
  let targetUrl: string;
  
  if (options.transport === 'http') {
    targetUrl = `${inspectorUrl}?url=http://localhost:${options.port}/mcp`;
  } else {
    targetUrl = inspectorUrl;
  }

  logger.info(`Opening MCP Inspector...`);
  logger.debug(`URL: ${targetUrl}`, options.verbose);

  // Wait a bit for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    await open(targetUrl);
    logger.success('Inspector opened in browser');
  } catch {
    logger.warning('Could not open browser automatically');
    logger.log(`Open manually: ${pc.cyan(targetUrl)}`);
  }
}

function startTestWatcher(): ReturnType<typeof spawn> {
  logger.info('Starting test watcher...');
  
  const testProcess = spawn('npx', ['vitest', '--watch'], {
    stdio: 'pipe',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'test',
    },
  });

  testProcess.stdout?.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(pc.dim('[test]'), output);
    }
  });

  testProcess.stderr?.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.error(pc.dim('[test]'), output);
    }
  });

  return testProcess;
}
