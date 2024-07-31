import { defineConfig } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: path.resolve(__dirname),
  build: {
    outDir: path.resolve(process.cwd(), '.routerix'),
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
      logLevel: 'silent',
    },
    emptyOutDir: true,
  },
  base: './',
  logLevel: 'silent',
});