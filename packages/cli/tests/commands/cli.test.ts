import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, '../../bin/mcpkit.ts');

describe('mcpkit CLI', () => {
  it('should show help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Build, validate, and ship production-ready MCP servers');
  });

  it('should show version', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, '--version'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toMatch(/\d+\.\d+\.\d+/);
  });

  it('should show init help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'init', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Initialize a new MCP server project');
  });

  it('should show build help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'build', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Build the MCP server for production');
  });

  it('should show dev help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'dev', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Start development server with hot reload');
  });

  it('should show validate help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'validate', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Validate MCP server configuration');
  });

  it('should show test help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'test', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Run tests for the MCP server');
  });

  it('should show docs help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'docs', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Generate documentation for the MCP server');
  });

  it('should show check-env help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'check-env', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Check development environment setup');
  });

  it('should show ship help', async () => {
    const result = await execa('bunx', ['tsx', CLI_PATH, 'ship', '--help'], {
      reject: false,
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Build and publish the MCP server');
  });
});
