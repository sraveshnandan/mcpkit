import { Command } from 'commander';
import pc from 'picocolors';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { logger } from '../utils/logger.js';

type ShellType = 'bash' | 'zsh' | 'fish';

interface CompletionsOptions {
  install: boolean;
  print: boolean;
}

export function registerCompletionsCommand(program: Command): void {
  program
    .command('completions')
    .description('Generate shell completions')
    .argument('<shell>', 'Shell type (bash, zsh, fish)')
    .option('--install', 'Install completions automatically')
    .option('--print', 'Print to stdout instead of installing')
    .action(async (shell: string, options: CompletionsOptions) => {
      await runCompletions(shell as ShellType, options);
    });
}

async function runCompletions(shell: ShellType, options: CompletionsOptions): Promise<void> {
  if (!['bash', 'zsh', 'fish'].includes(shell)) {
    logger.error(`Unsupported shell: ${shell}`);
    logger.info('Supported shells: bash, zsh, fish');
    process.exit(1);
  }

  const script = generateCompletionScript(shell);

  if (options.print) {
    console.log(script);
    return;
  }

  if (options.install) {
    await installCompletion(shell, script);
    return;
  }

  // Default: print to stdout with instructions
  logger.log(pc.cyan(`Generated ${shell} completions:\n`));
  console.log(script);
  logger.break();
  logger.log(pc.cyan('To install:'));
  logger.log(`  mcpkit completions ${shell} --install`);
}

async function installCompletion(shell: ShellType, script: string): Promise<void> {
  const spinner = logger;
  
  try {
    const installPath = getInstallPath(shell);
    const installDir = path.dirname(installPath);

    if (!fs.existsSync(installDir)) {
      fs.mkdirSync(installDir, { recursive: true });
    }

    fs.writeFileSync(installPath, script, { mode: 0o755 });

    logger.success(`Completions installed to ${pc.cyan(installPath)}`);
    logger.break();
    logger.log(pc.cyan('To activate:'));
    
    switch (shell) {
      case 'bash':
        logger.log(`  source ${installPath}`);
        logger.log('  # Or add to ~/.bashrc:');
        logger.log(`  echo 'source ${installPath}' >> ~/.bashrc`);
        break;
      case 'zsh':
        logger.log(`  source ${installPath}`);
        logger.log('  # Or add to ~/.zshrc:');
        logger.log(`  echo 'source ${installPath}' >> ~/.zshrc`);
        break;
      case 'fish':
        logger.log(`  source ${installPath}`);
        break;
    }
  } catch (error) {
    logger.error('Failed to install completions');
    logger.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

function getInstallPath(shell: ShellType): string {
  const home = os.homedir();
  
  switch (shell) {
    case 'bash':
      return path.join(home, '.local', 'share', 'bash-completion', 'completions', 'mcpkit');
    case 'zsh':
      return path.join(home, '.zsh', 'completions', '_mcpkit');
    case 'fish':
      return path.join(home, '.config', 'fish', 'completions', 'mcpkit.fish');
  }
}

function generateCompletionScript(shell: ShellType): string {
  switch (shell) {
    case 'bash':
      return generateBashCompletions();
    case 'zsh':
      return generateZshCompletions();
    case 'fish':
      return generateFishCompletions();
  }
}

function generateBashCompletions(): string {
  return `#!/usr/bin/env bash

_mcpkit_completions() {
  local cur prev commands global_options
  COMPREPLY=()
  cur="\${COMP_WORDS[COMP_CWORD]}"
  prev="\${COMP_WORDS[COMP_CWORD-1]}"
  
  commands="init dev build test validate docs check-env ship completions doctor"
  global_options="--help --version --verbose --dry-run --no-color --json"
  
  # Global options
  if [[ \${cur} == -* ]] ; then
    COMPREPLY=( $(compgen -W "\${global_options}" -- \${cur}) )
    return 0
  fi
  
  # Commands
  if [[ \${COMP_CWORD} -eq 1 ]] ; then
    COMPREPLY=( $(compgen -W "\${commands}" -- \${cur}) )
    return 0
  fi
  
  # Command-specific options
  case "\${COMP_WORDS[1]}" in
    init)
      COMPREPLY=( $(compgen -W "--template --package-manager --yes --help" -- \${cur}) )
      ;;
    dev)
      COMPREPLY=( $(compgen -W "--entry --transport --port --inspect --test --verbose --help" -- \${cur}) )
      ;;
    build)
      COMPREPLY=( $(compgen -W "--outDir --clean --dry-run --verbose --help" -- \${cur}) )
      ;;
    test)
      COMPREPLY=( $(compgen -W "--watch --coverage --verbose --help" -- \${cur}) )
      ;;
    validate)
      COMPREPLY=( $(compgen -W "--file --verbose --help" -- \${cur}) )
      ;;
    docs)
      COMPREPLY=( $(compgen -W "--outDir --verbose --help" -- \${cur}) )
      ;;
    check-env)
      COMPREPLY=( $(compgen -W "--json --verbose --help" -- \${cur}) )
      ;;
    ship)
      COMPREPLY=( $(compgen -W "--bump --dry-run --verbose --help" -- \${cur}) )
      ;;
    completions)
      COMPREPLY=( $(compgen -W "--install --print --help" -- \${cur}) )
      ;;
    doctor)
      COMPREPLY=( $(compgen -W "--json --verbose --help" -- \${cur}) )
      ;;
  esac
  
  return 0
}

complete -F _mcpkit_completions mcpkit
`;
}

function generateZshCompletions(): string {
  return `#compdef mcpkit

_mcpkit() {
  local -a commands
  commands=(
    'init:Initialize a new MCP server project'
    'dev:Start development server with hot reload'
    'build:Build the MCP server for production'
    'test:Run tests for the MCP server'
    'validate:Validate MCP server configuration'
    'docs:Generate documentation for the MCP server'
    'check-env:Check development environment setup'
    'ship:Build and publish the MCP server'
    'completions:Generate shell completions'
    'doctor:Check project health and diagnose issues'
  )

  local -a init_options
  init_options=(
    '--template[Template to use]:template:(basic http auth full)'
    '--package-manager[Package manager]:pm:(bun npm pnpm)'
    '--yes[Skip prompts]'
    '--help[Show help]'
  )

  local -a dev_options
  dev_options=(
    '--entry[Entry file]:file:_files'
    '--transport[Transport type]:transport:(stdio http)'
    '--port[Port number]:port'
    '--inspect[Open MCP Inspector]'
    '--test[Run tests on changes]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a build_options
  build_options=(
    '--outDir[Output directory]:dir:_directories'
    '--clean[Clean output directory]'
    '--dry-run[Preview without executing]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a test_options
  test_options=(
    '--watch[Watch mode]'
    '--coverage[Enable coverage]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a validate_options
  validate_options=(
    '--file[Config file]:file:_files'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a docs_options
  docs_options=(
    '--outDir[Output directory]:dir:_directories'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a checkenv_options
  checkenv_options=(
    '--json[Output as JSON]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a ship_options
  ship_options=(
    '--bump[Version bump type]:bump:(patch minor major)'
    '--dry-run[Preview without publishing]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  local -a completions_options
  completions_options=(
    '--install[Install completions]'
    '--print[Print to stdout]'
    '--help[Show help]'
  )

  local -a doctor_options
  doctor_options=(
    '--json[Output as JSON]'
    '--verbose[Verbose output]'
    '--help[Show help]'
  )

  _arguments -C \
    '1:command:->command' \
    '*::arg:->args'

  case "$state" in
    command)
      _describe 'command' commands
      ;;
    args)
      case "\${words[1]}" in
        init)
          _arguments $init_options
          ;;
        dev)
          _arguments $dev_options
          ;;
        build)
          _arguments $build_options
          ;;
        test)
          _arguments $test_options
          ;;
        validate)
          _arguments $validate_options
          ;;
        docs)
          _arguments $docs_options
          ;;
        check-env)
          _arguments $checkenv_options
          ;;
        ship)
          _arguments $ship_options
          ;;
        completions)
          _arguments $completions_options
          ;;
        doctor)
          _arguments $doctor_options
          ;;
      esac
      ;;
  esac
}

_mcpkit "$@"
`;
}

function generateFishCompletions(): string {
  return `# Completions for mcpkit

# Helper function to check if previous token is a specific command
function __mcpkit_using_command
  set -l cmd (commandline -opc)
  test (count $cmd) -gt 1; and test "$cmd[2]" = "$argv[1]"
end

# Global options
complete -c mcpkit -f
complete -c mcpkit -l help -s h -d 'Show help'
complete -c mcpkit -l version -s V -d 'Show version'
complete -c mcpkit -l verbose -s v -d 'Verbose output'
complete -c mcpkit -l dry-run -d 'Preview without executing'
complete -c mcpkit -l no-color -d 'Disable colored output'

# Commands
complete -c mcpkit -n '__fish_use_subcommand' -a init -d 'Initialize a new MCP server project'
complete -c mcpkit -n '__fish_use_subcommand' -a dev -d 'Start development server with hot reload'
complete -c mcpkit -n '__fish_use_subcommand' -a build -d 'Build for production'
complete -c mcpkit -n '__fish_use_subcommand' -a test -d 'Run tests'
complete -c mcpkit -n '__fish_use_subcommand' -a validate -d 'Validate configuration'
complete -c mcpkit -n '__fish_use_subcommand' -a docs -d 'Generate documentation'
complete -c mcpkit -n '__fish_use_subcommand' -a check-env -d 'Check environment'
complete -c mcpkit -n '__fish_use_subcommand' -a ship -d 'Publish to npm'
complete -c mcpkit -n '__fish_use_subcommand' -a completions -d 'Generate completions'
complete -c mcpkit -n '__fish_use_subcommand' -a doctor -d 'Run diagnostics'

# init options
complete -c mcpkit -n '__mcpkit_using_command init' -l template -d 'Template to use' -r -a 'basic http auth full'
complete -c mcpkit -n '__mcpkit_using_command init' -l package-manager -d 'Package manager' -r -a 'bun npm pnpm'
complete -c mcpkit -n '__mcpkit_using_command init' -l yes -s y -d 'Skip prompts'

# dev options
complete -c mcpkit -n '__mcpkit_using_command dev' -l entry -d 'Entry file' -r -F
complete -c mcpkit -n '__mcpkit_using_command dev' -l transport -d 'Transport type' -r -a 'stdio http'
complete -c mcpkit -n '__mcpkit_using_command dev' -l port -d 'Port number' -r
complete -c mcpkit -n '__mcpkit_using_command dev' -l inspect -d 'Open MCP Inspector'
complete -c mcpkit -n '__mcpkit_using_command dev' -l test -d 'Run tests on changes'

# build options
complete -c mcpkit -n '__mcpkit_using_command build' -l outDir -d 'Output directory' -r -F
complete -c mcpkit -n '__mcpkit_using_command build' -l clean -d 'Clean output directory'
complete -c mcpkit -n '__mcpkit_using_command build' -l dry-run -d 'Preview without executing'

# test options
complete -c mcpkit -n '__mcpkit_using_command test' -l watch -s w -d 'Watch mode'
complete -c mcpkit -n '__mcpkit_using_command test' -l coverage -d 'Enable coverage'

# validate options
complete -c mcpkit -n '__mcpkit_using_command validate' -l file -d 'Config file' -r -F

# docs options
complete -c mcpkit -n '__mcpkit_using_command docs' -l outDir -d 'Output directory' -r -F

# check-env options
complete -c mcpkit -n '__mcpkit_using_command check-env' -l json -d 'Output as JSON'

# ship options
complete -c mcpkit -n '__mcpkit_using_command ship' -l bump -d 'Version bump type' -r -a 'patch minor major'
complete -c mcpkit -n '__mcpkit_using_command ship' -l dry-run -d 'Preview without publishing'

# completions options
complete -c mcpkit -n '__mcpkit_using_command completions' -l install -d 'Install completions'
complete -c mcpkit -n '__mcpkit_using_command completions' -l print -d 'Print to stdout'

# doctor options
complete -c mcpkit -n '__mcpkit_using_command doctor' -l json -d 'Output as JSON'
`;
}
