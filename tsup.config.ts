import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/cli/index.ts', 'src/lib/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  onSuccess: 'cp -a ./src/app dist'
})