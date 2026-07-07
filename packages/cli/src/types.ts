export interface McpKitConfig {
  name: string;
  version: string;
  description?: string;
  build?: {
    target?: 'node';
    format?: 'esm';
    outDir?: string;
  };
  test?: {
    runner?: 'vitest';
    coverage?: boolean;
  };
}

export interface InitOptions {
  name: string;
  description?: string;
  template: 'basic' | 'http' | 'auth' | 'full';
  packageManager: 'bun' | 'npm' | 'pnpm';
  yes: boolean;
}

export interface DevOptions {
  entry: string;
  verbose: boolean;
  transport: 'stdio' | 'http';
  port: number;
  inspect: boolean;
  test: boolean;
}

export interface ValidateOptions {
  file: string;
  verbose: boolean;
}

export interface BuildOptions {
  outDir: string;
  clean: boolean;
  verbose: boolean;
  dryRun: boolean;
}

export interface TestOptions {
  watch: boolean;
  coverage: boolean;
  verbose: boolean;
}

export interface DocsOptions {
  outDir: string;
  verbose: boolean;
}

export interface CheckEnvOptions {
  verbose: boolean;
  json: boolean;
}

export interface ShipOptions {
  bump: 'patch' | 'minor' | 'major';
  dryRun: boolean;
  verbose: boolean;
}

export interface DoctorOptions {
  json: boolean;
  verbose: boolean;
}

export interface CompletionsOptions {
  install: boolean;
  print: boolean;
}
