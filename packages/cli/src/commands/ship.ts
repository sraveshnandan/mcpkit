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

function detectPackageManager(projectDir: string): string {
  // Check package.json first
  const pkgJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    if (pkgJson.packageManager) {
      const pm = pkgJson.packageManager.split('@')[0];
      if (['npm', 'pnpm', 'yarn', 'bun'].includes(pm)) {
        return pm;
      }
    }
  }

  // Check for lock files
  if (fs.existsSync(path.join(projectDir, 'bun.lockb')) || fs.existsSync(path.join(projectDir, 'bun.lock'))) {
    return 'bun';
  }
  if (fs.existsSync(path.join(projectDir, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(projectDir, 'yarn.lock'))) {
    return 'yarn';
  }
  if (fs.existsSync(path.join(projectDir, 'package-lock.json'))) {
    return 'npm';
  }

  // Default to npm
  return 'npm';
}

function getPublishCommand(packageManager: string): string {
  switch (packageManager) {
    case 'bun':
      return 'bun publish';
    case 'pnpm':
      return 'pnpm publish';
    case 'yarn':
      return 'yarn publish';
    case 'npm':
    default:
      return 'npm publish';
  }
}

function getTestCommand(packageManager: string): string {
  switch (packageManager) {
    case 'bun':
      return 'bun run test';
    case 'pnpm':
      return 'pnpm test';
    case 'yarn':
      return 'yarn test';
    case 'npm':
    default:
      return 'npm test';
  }
}

function getBuildCommand(packageManager: string): string {
  switch (packageManager) {
    case 'bun':
      return 'bun run build';
    case 'pnpm':
      return 'pnpm build';
    case 'yarn':
      return 'yarn build';
    case 'npm':
    default:
      return 'npm run build';
  }
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

  // Detect package manager
  const packageManager = detectPackageManager(projectDir);
  logger.info(`Package manager: ${pc.cyan(packageManager)}`);
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
      execSync(getTestCommand(packageManager), { stdio: 'pipe' });
    }
    logger.debug('Tests passed', options.verbose);

    spinner.text = 'Building project...';
    if (!options.dryRun) {
      execSync(getBuildCommand(packageManager), { stdio: 'pipe' });
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
        newVersion = `${major}.${minor}.${(patch || 0) + 1}`;
    }

    pkgJson.version = newVersion;

    if (!options.dryRun) {
      fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');
    }
    logger.debug(`Version bumped to ${newVersion}`, options.verbose);

    spinner.text = 'Publishing to npm...';
    if (!options.dryRun) {
      execSync(getPublishCommand(packageManager), { stdio: 'pipe' });
    }
    logger.debug('Published to npm', options.verbose);

    spinner.succeed('Release complete!');

    logger.break();
    logger.log(pc.cyan('Release summary:'));
    logger.log(`  ${pc.dim('Version:')} ${pc.green(currentVersion)} → ${pc.green(newVersion)}`);
    logger.log(`  ${pc.dim('Package:')} ${pkgJson.name}`);
    logger.log(`  ${pc.dim('Manager:')} ${packageManager}`);

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
