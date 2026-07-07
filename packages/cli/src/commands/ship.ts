import { Command } from 'commander';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { prompts, isCancel, cancel } from '../utils/prompts.js';

export function registerShipCommand(program: Command): void {
  program
    .command('ship')
    .description('Build and publish the MCP server')
    .option('-b, --bump <bump>', 'Version bump type', 'patch')
    .option('--dry-run', 'Preview without publishing')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      await runShip(options);
    });
}

interface ShipOptions {
  bump: 'patch' | 'minor' | 'major';
  dryRun: boolean;
  verbose: boolean;
}

async function runShip(options: ShipOptions): Promise<void> {
  const projectDir = process.cwd();
  const pkgJsonPath = path.join(projectDir, 'package.json');

  if (!fs.existsSync(pkgJsonPath)) {
    logger.error('package.json not found');
    logger.info('Make sure you are in the project root directory.');
    process.exit(1);
  }

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
  const currentVersion = pkgJson.version;

  logger.info(`Current version: ${pc.cyan(currentVersion)}`);

  if (options.dryRun) {
    logger.warning('Dry run mode - no changes will be made');
  }

  const confirm = await prompts.confirm({
    message: `Bump version (${options.bump})?`,
  });

  if (isCancel(confirm) || !confirm) {
    cancel('Operation cancelled.');
  }

  const spinner = createSpinner('Preparing release...').start();

  try {
    spinner.text = 'Running tests...';
    if (!options.dryRun) {
      execSync('npx vitest run', { stdio: 'pipe' });
    }
    logger.debug('Tests passed', options.verbose);

    spinner.text = 'Building project...';
    if (!options.dryRun) {
      execSync('npx tsc', { stdio: 'pipe' });
    }
    logger.debug('Build complete', options.verbose);

    spinner.text = 'Bumping version...';
    const [major, minor, patch] = currentVersion.split('.').map(Number);
    let newVersion: string;

    switch (options.bump) {
      case 'major':
        newVersion = `${major + 1}.0.0`;
        break;
      case 'minor':
        newVersion = `${major}.${minor + 1}.0`;
        break;
      case 'patch':
      default:
        newVersion = `${major}.${minor}.${patch + 1}`;
    }

    pkgJson.version = newVersion;

    if (!options.dryRun) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    }
    logger.debug(`Version bumped to ${newVersion}`, options.verbose);

    spinner.text = 'Publishing to npm...';
    if (!options.dryRun) {
      execSync('npm publish', { stdio: 'pipe' });
    }
    logger.debug('Published to npm', options.verbose);

    spinner.succeed('Release complete!');

    logger.break();
    logger.log(pc.cyan('Release summary:'));
    logger.log(`  ${pc.dim('Version:')} ${pc.green(currentVersion)} → ${pc.green(newVersion)}`);
    logger.log(`  ${pc.dim('Package:')} ${pkgJson.name}`);

    if (!options.dryRun) {
      logger.break();
      logger.success(`Published ${pc.bold(pkgJson.name)}@${pc.green(newVersion)}`);
    } else {
      logger.break();
      logger.warning('Dry run mode - nothing was published');
    }
  } catch (err) {
    spinner.fail('Release failed');
    logger.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
