import { Command } from 'commander';
import pc from 'picocolors';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';

export function registerCheckEnvCommand(program: Command): void {
  program
    .command('check-env')
    .description('Check development environment setup')
    .option('-v, --verbose', 'Verbose output')
    .option('--json', 'Output results as JSON')
    .action(async (options) => {
      await runCheckEnv(options);
    });
}

interface CheckEnvOptions {
  verbose: boolean;
  json: boolean;
}

interface CheckResult {
  name: string;
  status: 'pass' | 'fail' | 'warn';
  message: string;
}

async function runCheckEnv(options: CheckEnvOptions): Promise<void> {
  const spinner = createSpinner('Checking environment...').start();

  const checks: CheckResult[] = [];

  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
    const major = parseInt(nodeVersion.replace('v', '').split('.')[0] ?? '0');
    checks.push({
      name: 'Node.js',
      status: major >= 18 ? 'pass' : 'fail',
      message: `${nodeVersion} ${major >= 18 ? '' : '(requires >=18)'}`,
    });
  } catch {
    checks.push({ name: 'Node.js', status: 'fail', message: 'Not found' });
  }

  try {
    const npmVersion = execSync('npm --version', { encoding: 'utf-8' }).trim();
    checks.push({ name: 'npm', status: 'pass', message: `v${npmVersion}` });
  } catch {
    checks.push({ name: 'npm', status: 'warn', message: 'Not found' });
  }

  try {
    const bunVersion = execSync('bun --version', { encoding: 'utf-8' }).trim();
    checks.push({ name: 'Bun', status: 'pass', message: `v${bunVersion}` });
  } catch {
    checks.push({ name: 'Bun', status: 'warn', message: 'Not found (optional)' });
  }

  try {
    const pnpmVersion = execSync('pnpm --version', { encoding: 'utf-8' }).trim();
    checks.push({ name: 'pnpm', status: 'pass', message: `v${pnpmVersion}` });
  } catch {
    checks.push({ name: 'pnpm', status: 'warn', message: 'Not found (optional)' });
  }

  const projectDir = process.cwd();
  const pkgJsonPath = path.join(projectDir, 'package.json');

  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    checks.push({
      name: 'package.json',
      status: 'pass',
      message: pkgJson.name || 'Found',
    });

    const hasMcpDep = pkgJson.dependencies?.['@modelcontextprotocol/sdk'];
    checks.push({
      name: 'MCP SDK',
      status: hasMcpDep ? 'pass' : 'warn',
      message: hasMcpDep || 'Not installed',
    });

    const hasTs = pkgJson.devDependencies?.typescript || pkgJson.dependencies?.typescript;
    checks.push({
      name: 'TypeScript',
      status: hasTs ? 'pass' : 'warn',
      message: hasTs || 'Not installed',
    });
  } else {
    checks.push({
      name: 'package.json',
      status: 'fail',
      message: 'Not found in current directory',
    });
  }

  const srcDir = path.join(projectDir, 'src');
  checks.push({
    name: 'Source directory',
    status: fs.existsSync(srcDir) ? 'pass' : 'warn',
    message: fs.existsSync(srcDir) ? 'Found' : 'Not found',
  });

  spinner.stop();

  if (options.json) {
    const result = {
      checks: checks.reduce((acc, check) => {
        acc[check.name] = { status: check.status, message: check.message };
        return acc;
      }, {} as Record<string, { status: string; message: string }>),
      summary: {
        pass: checks.filter(c => c.status === 'pass').length,
        warn: checks.filter(c => c.status === 'warn').length,
        fail: checks.filter(c => c.status === 'fail').length,
      },
    };
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  logger.break();
  logger.log(pc.cyan('Environment Check:'));
  logger.break();

  checks.forEach((check) => {
    const icon = check.status === 'pass' ? pc.green('✔') : check.status === 'fail' ? pc.red('✖') : pc.yellow('⚠');
    const msg = check.status === 'pass' ? pc.green(check.message) : check.status === 'fail' ? pc.red(check.message) : pc.yellow(check.message);
    logger.log(`  ${icon} ${pc.bold(check.name)}: ${msg}`);
  });

  const failures = checks.filter((c) => c.status === 'fail');
  const warnings = checks.filter((c) => c.status === 'warn');

  logger.break();
  if (failures.length === 0) {
    logger.success(pc.green('Environment is ready!'));
  } else {
    logger.error(`${failures.length} issue(s) found`);
  }

  if (warnings.length > 0 && options.verbose) {
    logger.log(pc.dim(`${warnings.length} warning(s) - these are optional`));
  }
}
