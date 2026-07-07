import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLI_PATH = path.resolve(__dirname, '../../bin/mcpkit.ts');

describe('check-env command', () => {
  it('should run check-env without errors', async () => {
    const result = await execa('npx', ['tsx', CLI_PATH, 'check-env'], {
      reject: false,
      cwd: path.resolve(__dirname, '../..'),
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Environment Check');
  });

  it('should show verbose output', async () => {
    const result = await execa('npx', ['tsx', CLI_PATH, 'check-env', '--verbose'], {
      reject: false,
      cwd: path.resolve(__dirname, '../..'),
    });
    expect(result.exitCode).toBe(0);
    expect(result.stdout).toContain('Environment Check');
  });
});
