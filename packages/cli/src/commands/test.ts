import { Command } from 'commander';
import pc from 'picocolors';
import { execSync } from 'node:child_process';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';

export function registerTestCommand(program: Command): void {
  program
    .command('test')
    .description('Run tests for the MCP server')
    .option('-w, --watch', 'Watch mode')
    .option('--coverage', 'Enable coverage')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      await runTest(options);
    });
}

interface TestOptions {
  watch: boolean;
  coverage: boolean;
  verbose: boolean;
}

async function runTest(options: TestOptions): Promise<void> {
  const spinner = createSpinner('Running tests...').start();

  try {
    const args = ['vitest'];

    if (!options.watch) {
      args.push('run');
    }

    if (options.coverage) {
      args.push('--coverage');
    }

    execSync(`npx ${args.join(' ')}`, { stdio: 'inherit' });

    spinner.succeed('Tests completed!');
  } catch {
    spinner.fail('Tests failed');
    process.exit(1);
  }
}
