import * as p from '@clack/prompts';

export { p as prompts };

export function isCancel(value: unknown): boolean {
  return p.isCancel(value);
}

export function cancel(message: string): void {
  p.cancel(message);
  process.exit(0);
}
