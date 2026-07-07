import { Command } from 'commander';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';

interface DiagnosticCheck {
  name: string;
  status: 'pass' | 'warn' | 'fail';
  message: string;
  fix?: string;
}

interface DoctorOptions {
  json: boolean;
  verbose: boolean;
}

export function registerDoctorCommand(program: Command): void {
  program
    .command('doctor')
    .description('Check project health and diagnose issues')
    .option('--json', 'Output results as JSON')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options: DoctorOptions) => {
      await runDoctor(options);
    });
}

async function runDoctor(options: DoctorOptions): Promise<void> {
  if (!options.json) {
    const spinner = createSpinner('Checking project health...').start();
    spinner.stop();
  }

  const checks: DiagnosticCheck[] = [];

  // Environment checks
  checks.push(...await checkEnvironment());

  // Project structure checks
  checks.push(...checkProjectStructure());

  // MCP-specific checks
  checks.push(...checkMcpConfiguration());

  if (options.json) {
    const result = {
      environment: {
        node: checks.find(c => c.name === 'Node.js'),
        packageManager: checks.find(c => c.name === 'Package Manager'),
      },
      project: {
        packageJson: checks.find(c => c.name === 'package.json'),
        tsconfig: checks.find(c => c.name === 'tsconfig.json'),
        sourceDir: checks.find(c => c.name === 'Source directory'),
        entryPoint: checks.find(c => c.name === 'Entry point'),
      },
      mcp: {
        sdk: checks.find(c => c.name === 'MCP SDK'),
        tools: checks.find(c => c.name === 'Tool definitions'),
        config: checks.find(c => c.name === 'MCP config'),
      },
      summary: {
        pass: checks.filter(c => c.status === 'pass').length,
        warn: checks.filter(c => c.status === 'warn').length,
        fail: checks.filter(c => c.status === 'fail').length,
      },
    };
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  // Display results
  displayResults(checks);
}

async function checkEnvironment(): Promise<DiagnosticCheck[]> {
  const checks: DiagnosticCheck[] = [];

  // Node.js
  try {
    const nodeVersion = execSync('node --version', { encoding: 'utf-8' }).trim();
    const major = parseInt(nodeVersion.replace('v', '').split('.')[0] ?? '0');
    checks.push({
      name: 'Node.js',
      status: major >= 18 ? 'pass' : 'fail',
      message: `${nodeVersion} ${major >= 18 ? '' : '(requires >=18)'}`,
      fix: major < 18 ? 'Upgrade Node.js to version 18 or higher' : undefined,
    });
  } catch {
    checks.push({
      name: 'Node.js',
      status: 'fail',
      message: 'Not found',
      fix: 'Install Node.js from https://nodejs.org',
    });
  }

  // Package Manager
  const pmChecks = await checkPackageManagers();
  checks.push(...pmChecks);

  return checks;
}

async function checkPackageManagers(): Promise<DiagnosticCheck[]> {
  const checks: DiagnosticCheck[] = [];
  const managers = [
    { name: 'bun', cmd: 'bun --version' },
    { name: 'npm', cmd: 'npm --version' },
    { name: 'pnpm', cmd: 'pnpm --version' },
  ];

  let found = false;
  for (const pm of managers) {
    try {
      const version = execSync(pm.cmd, { encoding: 'utf-8' }).trim();
      if (!found) {
        checks.push({
          name: 'Package Manager',
          status: 'pass',
          message: `${pm.name} v${version}`,
        });
        found = true;
      }
    } catch {
      // Skip
    }
  }

  if (!found) {
    checks.push({
      name: 'Package Manager',
      status: 'warn',
      message: 'No package manager found',
      fix: 'Install bun, npm, or pnpm',
    });
  }

  return checks;
}

function checkProjectStructure(): DiagnosticCheck[] {
  const checks: DiagnosticCheck[] = [];
  const projectDir = process.cwd();

  // package.json
  const pkgJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    checks.push({
      name: 'package.json',
      status: 'pass',
      message: 'Found',
    });
  } else {
    checks.push({
      name: 'package.json',
      status: 'fail',
      message: 'Not found',
      fix: 'Run `mcpkit init` to create a new project',
    });
  }

  // tsconfig.json
  const tsconfigPath = path.join(projectDir, 'tsconfig.json');
  if (fs.existsSync(tsconfigPath)) {
    checks.push({
      name: 'tsconfig.json',
      status: 'pass',
      message: 'Found',
    });
  } else {
    checks.push({
      name: 'tsconfig.json',
      status: 'warn',
      message: 'Not found',
      fix: 'Create a tsconfig.json for TypeScript support',
    });
  }

  // Source directory
  const srcDir = path.join(projectDir, 'src');
  if (fs.existsSync(srcDir)) {
    checks.push({
      name: 'Source directory',
      status: 'pass',
      message: 'Found',
    });
  } else {
    checks.push({
      name: 'Source directory',
      status: 'warn',
      message: 'Not found',
      fix: 'Create a src/ directory for your source code',
    });
  }

  // Entry point
  const entryPoints = ['src/index.ts', 'src/index.js', 'index.ts', 'index.js'];
  const foundEntry = entryPoints.find(ep => fs.existsSync(path.join(projectDir, ep)));
  if (foundEntry) {
    checks.push({
      name: 'Entry point',
      status: 'pass',
      message: foundEntry,
    });
  } else {
    checks.push({
      name: 'Entry point',
      status: 'warn',
      message: 'Not found',
      fix: 'Create an entry point (src/index.ts recommended)',
    });
  }

  return checks;
}

function checkMcpConfiguration(): DiagnosticCheck[] {
  const checks: DiagnosticCheck[] = [];
  const projectDir = process.cwd();

  // MCP SDK
  const pkgJsonPath = path.join(projectDir, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    const hasMcpSdk = pkgJson.dependencies?.['@modelcontextprotocol/sdk'];
    
    if (hasMcpSdk) {
      checks.push({
        name: 'MCP SDK',
        status: 'pass',
        message: hasMcpSdk,
      });
    } else {
      checks.push({
        name: 'MCP SDK',
        status: 'fail',
        message: 'Not installed',
        fix: 'Install with: npm install @modelcontextprotocol/sdk',
      });
    }
  }

  // Tool definitions
  const toolsDir = path.join(projectDir, 'src', 'tools');
  const indexTsPath = path.join(projectDir, 'src', 'index.ts');
  
  let hasTools = false;
  if (fs.existsSync(toolsDir)) {
    const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.ts'));
    hasTools = toolFiles.length > 0;
  }
  
  if (!hasTools && fs.existsSync(indexTsPath)) {
    const content = fs.readFileSync(indexTsPath, 'utf-8');
    hasTools = content.includes('registerTool') || content.includes('server.tool');
  }

  if (hasTools) {
    checks.push({
      name: 'Tool definitions',
      status: 'pass',
      message: 'Found',
    });
  } else {
    checks.push({
      name: 'Tool definitions',
      status: 'warn',
      message: 'No tools found',
      fix: 'Add tools in src/tools/ or register them in src/index.ts',
    });
  }

  // MCP config files
  const configFiles = [
    '.vscode/mcp.json',
    '.cursor/mcp.json',
    '.claude/mcp.json',
    'mcp.json',
  ];

  const foundConfigs = configFiles.filter(cf => fs.existsSync(path.join(projectDir, cf)));
  
  if (foundConfigs.length > 0) {
    checks.push({
      name: 'MCP config',
      status: 'pass',
      message: `Found: ${foundConfigs.join(', ')}`,
    });
  } else {
    checks.push({
      name: 'MCP config',
      status: 'warn',
      message: 'No config files found',
      fix: 'Run `mcpkit config generate` to create IDE configs',
    });
  }

  return checks;
}

function displayResults(checks: DiagnosticCheck[]): void {
  logger.break();
  logger.log(pc.cyan('Environment'));
  logger.log('─'.repeat(40));
  
  const envChecks = checks.filter(c => 
    ['Node.js', 'Package Manager'].includes(c.name)
  );
  envChecks.forEach(displayCheck);

  logger.break();
  logger.log(pc.cyan('Project Structure'));
  logger.log('─'.repeat(40));
  
  const projectChecks = checks.filter(c => 
    ['package.json', 'tsconfig.json', 'Source directory', 'Entry point'].includes(c.name)
  );
  projectChecks.forEach(displayCheck);

  logger.break();
  logger.log(pc.cyan('MCP Configuration'));
  logger.log('─'.repeat(40));
  
  const mcpChecks = checks.filter(c => 
    ['MCP SDK', 'Tool definitions', 'MCP config'].includes(c.name)
  );
  mcpChecks.forEach(displayCheck);

  // Summary
  const pass = checks.filter(c => c.status === 'pass').length;
  const warn = checks.filter(c => c.status === 'warn').length;
  const fail = checks.filter(c => c.status === 'fail').length;

  logger.break();
  logger.log(pc.cyan('Summary'));
  logger.log('─'.repeat(40));
  logger.log(`  ${pc.green(`✔ ${pass} passed`)}`);
  if (warn > 0) logger.log(`  ${pc.yellow(`⚠ ${warn} warnings`)}`);
  if (fail > 0) logger.log(`  ${pc.red(`✖ ${fail} failed`)}`);

  // Suggestions
  const suggestions = checks
    .filter(c => c.fix && c.status !== 'pass')
    .map(c => c.fix!);

  if (suggestions.length > 0) {
    logger.break();
    logger.log(pc.cyan('Suggestions'));
    logger.log('─'.repeat(40));
    suggestions.forEach((s, i) => {
      logger.log(`  ${pc.dim(`${i + 1}.`)} ${s}`);
    });
  }

  logger.break();
  if (fail === 0) {
    logger.success(pc.green('Your project is ready!'));
  } else {
    logger.warning('Fix the issues above to get started');
  }
}

function displayCheck(check: DiagnosticCheck): void {
  const icon = check.status === 'pass' 
    ? pc.green('✔') 
    : check.status === 'warn' 
      ? pc.yellow('⚠') 
      : pc.red('✖');
  
  const msg = check.status === 'pass' 
    ? pc.green(check.message) 
    : check.status === 'warn' 
      ? pc.yellow(check.message) 
      : pc.red(check.message);
  
  logger.log(`  ${icon} ${pc.bold(check.name)}: ${msg}`);
}
