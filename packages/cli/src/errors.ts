export const ExitCodes = {
  SUCCESS: 0,
  GENERAL_ERROR: 1,
  MISUSE: 2,
  CANCELLED: 130,
  NOT_FOUND: 127,
  PERMISSION: 126,
  CONFIG_ERROR: 78,
} as const;

export class McpKitError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly exitCode: number = ExitCodes.GENERAL_ERROR
  ) {
    super(message);
    this.name = 'McpKitError';
  }
}

export class ValidationError extends McpKitError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class BuildError extends McpKitError {
  constructor(message: string) {
    super(message, 'BUILD_ERROR');
    this.name = 'BuildError';
  }
}

export class ConfigError extends McpKitError {
  constructor(message: string) {
    super(message, 'CONFIG_ERROR', ExitCodes.CONFIG_ERROR);
    this.name = 'ConfigError';
  }
}

export class TemplateError extends McpKitError {
  constructor(message: string) {
    super(message, 'TEMPLATE_ERROR');
    this.name = 'TemplateError';
  }
}
