import { Command } from 'commander';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import { logger } from '../utils/logger.js';
import { createSpinner } from '../utils/spinner.js';
import { ValidationError } from '../errors.js';

export function registerValidateCommand(program: Command): void {
  program
    .command('validate')
    .description('Validate MCP server configuration')
    .option('-f, --file <file>', 'Config file to validate', 'src/index.ts')
    .option('-v, --verbose', 'Verbose output')
    .action(async (options) => {
      await runValidate(options);
    });
}

interface ValidateOptions {
  file: string;
  verbose: boolean;
}

async function runValidate(options: ValidateOptions): Promise<void> {
  const spinner = createSpinner('Validating configuration...').start();

  try {
    const filePath = path.resolve(process.cwd(), options.file);

    if (!fs.existsSync(filePath)) {
      throw new ValidationError(`File not found: ${options.file}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    const errors: string[] = [];
    const warnings: string[] = [];

    if (!content.includes('McpServer')) {
      errors.push('No McpServer instance found');
    }

    if (!content.includes('registerTool') && !content.includes('server.tool')) {
      warnings.push('No tools registered. Consider adding tools to your server.');
    }

    if (!content.includes('StdioServerTransport') && !content.includes('transport')) {
      warnings.push('No transport configured. Server may not be accessible.');
    }

    if (!content.includes('name:')) {
      warnings.push('Server name not found in configuration.');
    }

    if (!content.includes('version:')) {
      warnings.push('Server version not found in configuration.');
    }

    if (errors.length > 0) {
      spinner.fail('Validation failed');
      errors.forEach((err) => logger.error(err));
      process.exit(1);
    }

    spinner.succeed('Configuration is valid');

    if (warnings.length > 0) {
      logger.break();
      logger.warning('Warnings:');
      warnings.forEach((warn) => logger.warning(warn));
    }

    logger.break();
    logger.success('Validation passed!');
  } catch (err) {
    spinner.fail('Validation failed');
    if (err instanceof ValidationError) {
      logger.error(err.message);
    } else {
      logger.error(err instanceof Error ? err.message : String(err));
    }
    process.exit(1);
  }
}
