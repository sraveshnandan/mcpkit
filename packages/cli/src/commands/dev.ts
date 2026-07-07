import { Command } from 'commander';
import pc from 'picocolors';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger.js';

export function registerDevCommand(program: Command): void {
  program
    .command('dev')
    .description('Start development server with hot reload')
    .option('-e, --entry <entry>', 'Entry file', 'src/index.ts')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      await runDev(options);
    });
}

interface DevOptions {
  entry: string;
  verbose: boolean;
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

  const child = spawn('npx', ['tsx', 'watch', options.entry], {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NODE_ENV: 'development',
    },
  });

  child.on('error', (err) => {
    logger.error(`Failed to start dev server: ${err.message}`);
    process.exit(1);
  });

  child.on('close', (code) => {
    if (code !== null && code !== 0) {
      logger.error(`Dev server exited with code ${code}`);
      process.exit(code);
    }
  });

  process.on('SIGINT', () => {
    logger.info('Shutting down dev server...');
    child.kill('SIGINT');
    process.exit(0);
  });
}
