import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CLI_PATH = path.join(import.meta.dirname, '../../dist/bin/mcpkit.js');
const TEST_DIR = path.join(os.tmpdir(), 'mcpkit-e2e-test');

describe('E2E: Init and Build', () => {
  beforeAll(() => {
    // Clean up test directory
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
    fs.mkdirSync(TEST_DIR, { recursive: true });
  });

  afterAll(() => {
    // Clean up test directory
    if (fs.existsSync(TEST_DIR)) {
      fs.rmSync(TEST_DIR, { recursive: true });
    }
  });

  it('should create basic template project and typecheck + build', () => {
    const projectName = 'test-basic';
    const projectDir = path.join(TEST_DIR, projectName);

    // Create project
    execSync(`node ${CLI_PATH} init ${projectName} --template basic --yes`, {
      cwd: TEST_DIR,
      stdio: 'pipe',
    });

    // Verify files exist
    expect(fs.existsSync(path.join(projectDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'src/index.ts'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'tsconfig.json'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, '.vscode/mcp.json'))).toBe(true);

    // Install dependencies
    execSync('bun install', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Typecheck should pass (no error thrown)
    execSync('bun run typecheck', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Build should pass (no error thrown)
    execSync('bun run build', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Verify build output
    expect(fs.existsSync(path.join(projectDir, 'dist'))).toBe(true);
    const distFiles = fs.readdirSync(path.join(projectDir, 'dist'));
    expect(distFiles.some(f => f.endsWith('.js'))).toBe(true);
    expect(distFiles.some(f => f.endsWith('.d.ts'))).toBe(true);
  }, 120000);

  it('should create http template project and typecheck + build', () => {
    const projectName = 'test-http';
    const projectDir = path.join(TEST_DIR, projectName);

    // Create project
    execSync(`node ${CLI_PATH} init ${projectName} --template http --yes`, {
      cwd: TEST_DIR,
      stdio: 'pipe',
    });

    // Verify files exist
    expect(fs.existsSync(path.join(projectDir, 'package.json'))).toBe(true);
    expect(fs.existsSync(path.join(projectDir, 'src/index.ts'))).toBe(true);

    // Verify port is 3100 in generated code
    const indexContent = fs.readFileSync(path.join(projectDir, 'src/index.ts'), 'utf-8');
    expect(indexContent).toContain('3100');
    expect(indexContent).not.toContain('3000');

    // Verify README mentions correct port
    const readmeContent = fs.readFileSync(path.join(projectDir, 'README.md'), 'utf-8');
    expect(readmeContent).toContain('3100');
    expect(readmeContent).not.toContain('localhost:3000');

    // Install dependencies
    execSync('bun install', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Typecheck should pass
    execSync('bun run typecheck', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Build should pass
    execSync('bun run build', {
      cwd: projectDir,
      stdio: 'pipe',
    });

    // Verify build output
    expect(fs.existsSync(path.join(projectDir, 'dist'))).toBe(true);
  }, 120000);

  it('should have correct port in VS Code config for http template', () => {
    const projectName = 'test-http-config';
    const projectDir = path.join(TEST_DIR, projectName);

    // Create project
    execSync(`node ${CLI_PATH} init ${projectName} --template http --yes`, {
      cwd: TEST_DIR,
      stdio: 'pipe',
    });

    // Check VS Code config
    const vscodeConfig = JSON.parse(
      fs.readFileSync(path.join(projectDir, '.vscode/mcp.json'), 'utf-8')
    );
    const serverName = Object.keys(vscodeConfig.servers)[0];
    expect(vscodeConfig.servers[serverName].url).toContain('3100');
  }, 60000);
});
