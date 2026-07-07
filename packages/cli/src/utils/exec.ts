import { execa } from 'execa';
import type { Options, Result } from 'execa';

export async function run(
  command: string,
  args: string[],
  options?: Options
): Promise<Result> {
  return execa(command, args, {
    stdio: 'inherit',
    ...options,
  });
}

export async function runSilent(
  command: string,
  args: string[],
  options?: Options
): Promise<Result> {
  return execa(command, args, {
    stdio: 'pipe',
    ...options,
  });
}
