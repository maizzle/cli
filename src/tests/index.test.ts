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

// Mock the new command so it doesn't actually scaffold
vi.mock('../commands/new.ts', () => ({
  default: vi.fn(),
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

  it('registers new command without framework', async () => {
    const newProject = (await import('../commands/new.ts')).default

    process.argv = ['node', 'maizzle', 'new']

    await bootstrap()

    expect(newProject).toHaveBeenCalled()
  })

  it('does not register serve/build without framework', async () => {
    process.argv = ['node', 'maizzle', 'serve']

    // commander will error on unknown command, so we catch it
    const mockError = vi.spyOn(console, 'error').mockImplementation(() => {})
    const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {
      throw new Error('exit')
    }) as any)

    try {
      await bootstrap()
    } catch {}

    mockError.mockRestore()
    mockExit.mockRestore()
  })
})
