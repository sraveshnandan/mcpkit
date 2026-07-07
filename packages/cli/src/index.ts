import { Command } from 'commander';
import { registerInitCommand } from './commands/init.js';
import { registerDevCommand } from './commands/dev.js';
import { registerValidateCommand } from './commands/validate.js';
import { registerBuildCommand } from './commands/build.js';
import { registerTestCommand } from './commands/test.js';
import { registerDocsCommand } from './commands/docs.js';
import { registerCheckEnvCommand } from './commands/check-env.js';
import { registerShipCommand } from './commands/ship.js';
import { registerDoctorCommand } from './commands/doctor.js';
import { registerCompletionsCommand } from './commands/completions.js';

const VERSION = '0.1.0';

export async function createProgram(): Promise<void> {
  const program = new Command()
    .name('mcpkit')
    .description('Build, validate, and ship production-ready MCP servers')
    .version(VERSION)
    .option('--dry-run', 'Preview operations without executing')
    .option('-v, --verbose', 'Enable verbose output')
    .option('--no-color', 'Disable colored output')
    .showHelpAfterError(true);

  registerInitCommand(program);
  registerDevCommand(program);
  registerValidateCommand(program);
  registerBuildCommand(program);
  registerTestCommand(program);
  registerDocsCommand(program);
  registerCheckEnvCommand(program);
  registerShipCommand(program);
  registerDoctorCommand(program);
  registerCompletionsCommand(program);

  program.enablePositionalOptions();

  try {
    await program.parseAsync(process.argv);
  } catch (err: unknown) {
    if (err && typeof err === 'object' && 'code' in err) {
      const error = err as { code: string };
      if (error.code === 'commander.helpDisplayed' || error.code === 'commander.version') {
        process.exit(0);
      }
    }
    const message = err instanceof Error ? err.message : String(err);
    console.error(`Error: ${message}`);
    process.exitCode = 1;
  }
}

process.on('SIGINT', () => {
  console.log('\nOperation cancelled.');
  process.exit(130);
});
