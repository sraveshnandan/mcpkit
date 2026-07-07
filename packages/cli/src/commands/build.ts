import { Command } from 'commander';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { BuildError } from '../errors.js';

export function registerBuildCommand(program: Command): void {
  program
    .command('build')
    .description('Build the MCP server for production')
    .option('-o, --outDir <outDir>', 'Output directory', 'dist')
    .option('--no-clean', 'Skip cleaning output directory')
    .option('--dry-run', 'Preview build without executing')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      await runBuild(options);
    });
}

interface BuildOptions {
  outDir: string;
  clean: boolean;
  dryRun: boolean;
  verbose: boolean;
}

async function runBuild(options: BuildOptions): Promise<void> {
  const outDir = path.resolve(process.cwd(), options.outDir);
  const spinner = createSpinner('Building for production...').start();

  try {
    if (options.clean) {
      if (fs.existsSync(outDir)) {
        spinner.text = 'Cleaning output directory...';
        if (!options.dryRun) {
          fs.rmSync(outDir, { recursive: true, force: true });
        }
        logger.debug(`Cleaned ${options.outDir}`, options.verbose);
      }
    }

    spinner.text = 'Running TypeScript compiler...';
    if (!options.dryRun) {
      execSync('npx tsc', { stdio: 'pipe' });
    }
    logger.debug('TypeScript compilation complete', options.verbose);

    spinner.succeed('Build completed successfully!');

    if (fs.existsSync(outDir)) {
      const files = fs.readdirSync(outDir, { recursive: true });
      const jsFiles = files.filter((f) => typeof f === 'string' && f.endsWith('.js'));
      const dtsFiles = files.filter((f) => typeof f === 'string' && f.endsWith('.d.ts'));

      logger.break();
      logger.log(pc.cyan('Build output:'));
      logger.log(`  ${pc.dim('JS files:')} ${jsFiles.length}`);
      logger.log(`  ${pc.dim('Type defs:')} ${dtsFiles.length}`);
    }

    if (options.dryRun) {
      logger.break();
      logger.warning('Dry run mode - no files were written');
    }
  } catch (err) {
    spinner.fail('Build failed');
    if (err instanceof BuildError) {
      logger.error(err.message);
    } else {
      logger.error(err instanceof Error ? err.message : String(err));
    }
    process.exit(1);
  }
}
