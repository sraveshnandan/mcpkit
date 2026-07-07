import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'bin/mcpkit.ts'],
  format: ['esm'],
  target: 'node18',
  clean: true,
  splitting: false,
  sourcemap: true,
  dts: false,
  banner: {
    js: '#!/usr/bin/env node',
  },
  outDir: 'dist',
});
