import { defineConfig } from 'tsdown'
import { cpSync } from 'node:fs'

export default defineConfig({
  entry: [
    'src/**/*.ts',
    '!src/**/*.test.ts',
    '!src/commands/make/stubs/**',
  ],
  format: 'esm',
  dts: true,
  unbundle: true,
  outDir: 'dist',
  clean: true,
  hooks: {
    'build:done': () => {
      cpSync('src/commands/make/stubs', 'dist/commands/make/stubs', { recursive: true })
    },
  },
})
