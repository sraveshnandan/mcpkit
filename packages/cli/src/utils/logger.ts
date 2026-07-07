import pc from 'picocolors';

export const logger = {
  info: (message: string) => console.log(pc.cyan('ℹ'), message),
  success: (message: string) => console.log(pc.green('✔'), message),
  warning: (message: string) => console.log(pc.yellow('⚠'), message),
  error: (message: string) => console.error(pc.red('✖'), message),
  debug: (message: string, verbose = false) => {
    if (verbose) {
      console.log(pc.dim('→'), message);
    }
  },
  log: (message: string) => console.log(message),
  break: () => console.log(''),
};
