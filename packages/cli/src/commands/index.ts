import type { Command } from 'commander';
import { registerInitCommand } from './init.js';
import { registerDevCommand } from './dev.js';
import { registerValidateCommand } from './validate.js';
import { registerBuildCommand } from './build.js';
import { registerTestCommand } from './test.js';
import { registerDocsCommand } from './docs.js';
import { registerCheckEnvCommand } from './check-env.js';
import { registerShipCommand } from './ship.js';

export function registerAllCommands(program: Command): void {
  registerInitCommand(program);
  registerDevCommand(program);
  registerValidateCommand(program);
  registerBuildCommand(program);
  registerTestCommand(program);
  registerDocsCommand(program);
  registerCheckEnvCommand(program);
  registerShipCommand(program);
}

export {
  registerInitCommand,
  registerDevCommand,
  registerValidateCommand,
  registerBuildCommand,
  registerTestCommand,
  registerDocsCommand,
  registerCheckEnvCommand,
  registerShipCommand,
};
