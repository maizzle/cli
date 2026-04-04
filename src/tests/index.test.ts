import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mock process.exit and process.argv
vi.spyOn(process, 'exit').mockImplementation((() => {}) as any)

// Mock @clack/prompts
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  cancel: vi.fn(),
  group: vi.fn(),
  text: vi.fn(),
  confirm: vi.fn(),
}))

// Mock create-maizzle
vi.mock('create-maizzle', () => ({
  main: vi.fn(),
}))

import bootstrap from '../index.ts'

const mockFramework = {
  serve: vi.fn().mockResolvedValue(undefined),
  build: vi.fn().mockResolvedValue(undefined),
}

let originalArgv: string[]

beforeEach(() => {
  originalArgv = process.argv
  mockFramework.serve.mockClear()
  mockFramework.build.mockClear()
})

afterEach(() => {
  process.argv = originalArgv
})

describe('bootstrap', () => {
  it('calls framework.serve for the serve command', async () => {
    process.argv = ['node', 'maizzle', 'serve']

    await bootstrap(mockFramework)

    expect(mockFramework.serve).toHaveBeenCalledWith({
      config: undefined,
      port: undefined,
      host: undefined,
    })
  })

  it('passes port option to serve', async () => {
    process.argv = ['node', 'maizzle', 'serve', '-p', '4000']

    await bootstrap(mockFramework)

    expect(mockFramework.serve).toHaveBeenCalledWith({
      config: undefined,
      port: 4000,
      host: undefined,
    })
  })

  it('calls framework.build for the build command', async () => {
    process.argv = ['node', 'maizzle', 'build']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith({
      config: undefined,
      output: undefined,
    })
  })

  it('passes config and output options to build', async () => {
    process.argv = ['node', 'maizzle', 'build', '-c', 'custom.config.ts', '-o', 'dist']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith({
      config: 'custom.config.ts',
      output: 'dist',
    })
  })
})
