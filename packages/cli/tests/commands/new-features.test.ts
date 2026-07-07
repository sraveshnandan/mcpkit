import { describe, it, expect, beforeEach } from 'vitest';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CLI_PATH = path.join(import.meta.dirname, '../../dist/bin/mcpkit.js');

describe('doctor command', () => {
  beforeEach(() => {
    // Clean up any previous test artifacts
    const testDir = path.join(os.tmpdir(), 'mcpkit-test-doctor');
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true });
    }
  });

  it('should show doctor help', () => {
    const output = execSync(`node ${CLI_PATH} doctor --help`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('Check project health');
    expect(output).toContain('--json');
  });

  it('should run doctor without errors', () => {
    const output = execSync(`node ${CLI_PATH} doctor`, {
      encoding: 'utf-8',
      cwd: path.join(import.meta.dirname, '../..'),
    });

    expect(output).toContain('Environment');
    expect(output).toContain('Project Structure');
    expect(output).toContain('MCP Configuration');
    expect(output).toContain('Summary');
  });

  it('should output JSON when --json flag is provided', () => {
    const output = execSync(`node ${CLI_PATH} doctor --json`, {
      encoding: 'utf-8',
      cwd: path.join(import.meta.dirname, '../..'),
    });

    const json = JSON.parse(output);
    expect(json).toHaveProperty('environment');
    expect(json).toHaveProperty('project');
    expect(json).toHaveProperty('mcp');
    expect(json).toHaveProperty('summary');
    expect(json.environment).toHaveProperty('node');
    expect(json.environment).toHaveProperty('packageManager');
    expect(json.project).toHaveProperty('packageJson');
    expect(json.project).toHaveProperty('tsconfig');
    expect(json.project).toHaveProperty('sourceDir');
    expect(json.project).toHaveProperty('entryPoint');
    expect(json.mcp).toHaveProperty('sdk');
    expect(json.mcp).toHaveProperty('tools');
    expect(json.mcp).toHaveProperty('config');
  });
});

describe('completions command', () => {
  it('should show completions help', () => {
    const output = execSync(`node ${CLI_PATH} completions --help`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('Generate shell completions');
    expect(output).toContain('--install');
    expect(output).toContain('--print');
  });

  it('should generate bash completions to stdout', () => {
    const output = execSync(`node ${CLI_PATH} completions bash --print`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('#!/usr/bin/env bash');
    expect(output).toContain('_mcpkit_completions');
    expect(output).toContain('complete -F _mcpkit_completions mcpkit');
  });

  it('should generate zsh completions to stdout', () => {
    const output = execSync(`node ${CLI_PATH} completions zsh --print`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('#compdef mcpkit');
    expect(output).toContain('_mcpkit()');
    expect(output).toContain('_mcpkit "$@"');
  });

  it('should generate fish completions to stdout', () => {
    const output = execSync(`node ${CLI_PATH} completions fish --print`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('# Completions for mcpkit');
    expect(output).toContain('__mcpkit_using_command');
    expect(output).toContain('complete -c mcpkit');
  });

  it('should fail with unsupported shell', () => {
    try {
      execSync(`node ${CLI_PATH} completions powershell`, {
        encoding: 'utf-8',
      });
      expect.fail('Should have thrown');
    } catch (err: any) {
      expect(err.stderr).toContain('Unsupported shell');
    }
  });
});

describe('init command with templates', () => {
  it('should show init help with template options', () => {
    const output = execSync(`node ${CLI_PATH} init --help`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('--template');
    expect(output).toContain('basic');
    expect(output).toContain('http');
    expect(output).toContain('auth');
    expect(output).toContain('full');
  });
});

describe('dev command with new options', () => {
  it('should show dev help with new options', () => {
    const output = execSync(`node ${CLI_PATH} dev --help`, {
      encoding: 'utf-8',
    });

    expect(output).toContain('--transport');
    expect(output).toContain('--port');
    expect(output).toContain('--inspect');
    expect(output).toContain('--test');
  });
});
