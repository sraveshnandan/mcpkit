export interface TemplateVars {
  name: string;
  description: string;
  version: string;
  author?: string;
  packageManager: string;
  year: number;
}

export interface TemplateFile {
  path: string;
  content: (vars: TemplateVars) => string;
  executable?: boolean;
}

export interface TemplateConfig {
  name: string;
  description: string;
  hint: string;
  icon: string;
  files: TemplateFile[];
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  scripts: Record<string, string>;
  postInstall?: (vars: TemplateVars, projectDir: string) => Promise<void>;
}

export type TemplateName = 'basic' | 'http' | 'auth' | 'full';
