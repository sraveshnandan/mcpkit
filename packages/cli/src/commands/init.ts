import { Command } from 'commander';
import pc from 'picocolors';
import * as p from '@clack/prompts';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { run } from '../utils/exec.js';
import { getTemplate, getTemplateOptions, isValidTemplate, getTemplateNames } from '../templates/index.js';
import type { TemplateName, TemplateVars } from '../templates/types.js';

export function registerInitCommand(program: Command): void {
  program
    .command('init')
    .description('Initialize a new MCP server project')
    .argument('[name]', 'Project name')
    .option('-t, --template <template>', 'Template to use (basic, http, auth, full)')
    .option('-p, --package-manager <pm>', 'Package manager to use', 'bun')
    .option('-y, --yes', 'Skip prompts and use defaults')
    .action(async (name: string | undefined, options: InitOptions) => {
      await runInit(name, options);
    });
}

interface InitOptions {
  template?: string;
  packageManager: string;
  yes: boolean;
}

async function runInit(name: string | undefined, options: InitOptions): Promise<void> {
  // TTY detection: require TTY or --yes flag for non-interactive mode
  if (!process.stdin.isTTY && !options.yes) {
    logger.error('Interactive mode requires a TTY terminal.');
    logger.info('Use --yes flag to skip prompts and use defaults.');
    logger.info('Example: mcpkit init my-server --template basic --yes');
    process.exit(1);
  }

  // Validate template if provided
  if (options.template && !isValidTemplate(options.template)) {
    logger.error(`Template '${options.template}' not found.`);
    logger.info(`Available templates: ${getTemplateNames().join(', ')}`);
    process.exit(1);
  }

  let projectName: string;
  let description: string;
  let template: TemplateName;
  let packageManager: string;
  let installDeps: boolean;

  if (options.yes) {
    // Non-interactive mode: use defaults
    if (!name) {
      logger.error('Project name is required in non-interactive mode.');
      logger.info('Example: mcpkit init my-server --template basic --yes');
      process.exit(1);
    }
    if (!options.template) {
      logger.error('Template is required in non-interactive mode.');
      logger.info('Example: mcpkit init my-server --template basic --yes');
      process.exit(1);
    }

    projectName = name;
    description = `A ${name} MCP server`;
    template = options.template as TemplateName;
    packageManager = options.packageManager;
    installDeps = true;

    logger.info(`Creating project: ${pc.cyan(projectName)}`);
    logger.info(`Template: ${pc.cyan(template)}`);
    logger.info(`Package manager: ${pc.cyan(packageManager)}`);
  } else {
    // Interactive mode
    p.intro(pc.cyan('Create your MCP Server'));

    projectName = (await p.text({
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

    description = (await p.text({
      message: 'Project description (optional):',
      placeholder: 'A powerful MCP server',
    })) as string;

    if (p.isCancel(description)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    template = options.template ? (options.template as TemplateName) : (await p.select({
      message: 'Choose a template:',
      options: getTemplateOptions(),
    })) as TemplateName;

    if (p.isCancel(template)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    packageManager = (await p.select({
      message: 'Choose a package manager:',
      options: [
        { value: 'bun', label: 'Bun', hint: 'Fast all-in-one toolkit' },
        { value: 'npm', label: 'npm', hint: 'Default package manager' },
        { value: 'pnpm', label: 'pnpm', hint: 'Fast, disk space efficient' },
      ],
    })) as string;

    if (p.isCancel(packageManager)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }

    installDeps = await p.confirm({
      message: 'Install dependencies now?',
    });

    if (p.isCancel(installDeps)) {
      p.cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  const templateConfig = getTemplate(template);
  if (!templateConfig) {
    logger.error(`Template '${template}' not found`);
    process.exit(1);
  }

  const projectDir = path.resolve(process.cwd(), projectName);

  if (fs.existsSync(projectDir)) {
    logger.error(`Directory ${projectName} already exists`);
    process.exit(1);
  }

  const spinner = createSpinner('Creating project...').start();

  try {
    const vars: TemplateVars = {
      name: projectName,
      description: description || `A ${projectName} MCP server`,
      version: '0.1.0',
      packageManager,
      year: new Date().getFullYear(),
    };

    await scaffoldProject(projectDir, templateConfig.files, vars);

    spinner.succeed('Project created successfully!');

    if (installDeps) {
      const depsSpinner = createSpinner('Installing dependencies...').start();
      try {
        await run(packageManager, ['install'], { cwd: projectDir });
        depsSpinner.succeed('Dependencies installed!');
      } catch {
        depsSpinner.fail('Failed to install dependencies');
        logger.warning(`Run manually: cd ${projectName} && ${packageManager} install`);
      }
    }

    if (!options.yes) {
      p.outro(pc.green(`Project ${pc.bold(projectName)} created!\n`));
    }

    logger.log(pc.cyan('Next steps:'));
    if (!installDeps) {
      logger.log(`  cd ${projectName}`);
      logger.log(`  ${packageManager} install`);
    } else {
      logger.log(`  cd ${projectName}`);
    }
    logger.log(`  ${packageManager} run dev`);
    logger.break();
    logger.log(pc.dim('For more info, visit: https://mcpkit.dev'));
  } catch (err) {
    // Clean up on failure
    if (fs.existsSync(projectDir)) {
      fs.rmSync(projectDir, { recursive: true, force: true });
    }
    spinner.fail('Failed to create project');
    logger.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}

async function scaffoldProject(
  projectDir: string,
  files: Array<{ path: string; content: (vars: TemplateVars) => string }>,
  vars: TemplateVars
): Promise<void> {
  fs.mkdirSync(projectDir, { recursive: true });

  for (const file of files) {
    const filePath = path.join(projectDir, file.path);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const content = file.content(vars);
    fs.writeFileSync(filePath, content);
  }
}
