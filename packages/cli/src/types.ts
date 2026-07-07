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
  template: 'typescript';
  packageManager: 'bun' | 'npm' | 'pnpm';
}

export interface DevOptions {
  port?: number;
  verbose: boolean;
}

export interface ValidateOptions {
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
}

export interface ShipOptions {
  bump: 'patch' | 'minor' | 'major';
  dryRun: boolean;
  verbose: boolean;
}

export interface TemplateFile {
  path: string;
  content: string;
}

export interface TemplateConfig {
  name: string;
  description: string;
  files: TemplateFile[];
}
