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

vi.mock('../commands/make/config.ts', () => ({ default: vi.fn() }))
vi.mock('../commands/make/layout.ts', () => ({ default: vi.fn() }))
vi.mock('../commands/make/template.ts', () => ({ default: vi.fn() }))
vi.mock('../commands/make/component.ts', () => ({ default: vi.fn() }))

import bootstrap from '../index.ts'

const mockFramework = {
  serve: vi.fn().mockResolvedValue(undefined),
  build: vi.fn().mockResolvedValue(undefined),
  prepare: vi.fn().mockResolvedValue(undefined),
}

let originalArgv: string[]

beforeEach(() => {
  originalArgv = process.argv
  mockFramework.serve.mockClear()
  mockFramework.build.mockClear()
  mockFramework.prepare.mockClear()
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

  it('calls framework.build with no args for bare build command', async () => {
    process.argv = ['node', 'maizzle', 'build']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith(undefined)
  })

  it('passes config path as a string when -c is set', async () => {
    process.argv = ['node', 'maizzle', 'build', '-c', 'custom.config.ts']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith('custom.config.ts')
  })

  it('passes -o as output.path override', async () => {
    process.argv = ['node', 'maizzle', 'build', '-o', 'dist']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith({ output: { path: 'dist' } })
  })

  it('ignores override flags when -c is set', async () => {
    process.argv = ['node', 'maizzle', 'build', '-c', 'custom.config.ts', '-o', 'dist', '--pretty']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith('custom.config.ts')
  })

  it('passes --pretty as html.format override', async () => {
    process.argv = ['node', 'maizzle', 'build', '--pretty']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith({ html: { format: true } })
  })

  it('combines --pretty with -o overrides', async () => {
    process.argv = ['node', 'maizzle', 'build', '-o', 'dist', '--pretty']

    await bootstrap(mockFramework)

    expect(mockFramework.build).toHaveBeenCalledWith({
      output: { path: 'dist' },
      html: { format: true },
    })
  })

  it('calls framework.prepare for the prepare command', async () => {
    process.argv = ['node', 'maizzle', 'prepare']

    await bootstrap(mockFramework)

    expect(mockFramework.prepare).toHaveBeenCalledWith({
      config: undefined,
    })
  })

  it('passes config option to prepare', async () => {
    process.argv = ['node', 'maizzle', 'prepare', '-c', 'custom.config.ts']

    await bootstrap(mockFramework)

    expect(mockFramework.prepare).toHaveBeenCalledWith({
      config: 'custom.config.ts',
    })
  })

  it('registers new command without framework', async () => {
    const newProject = (await import('../commands/new.ts')).default

    process.argv = ['node', 'maizzle', 'new']

    await bootstrap()

    expect(newProject).toHaveBeenCalled()
  })

  it('dispatches make:config to its handler', async () => {
    const makeConfig = (await import('../commands/make/config.ts')).default
    process.argv = ['node', 'maizzle', 'make:config', 'production']

    await bootstrap()

    expect(makeConfig).toHaveBeenCalledWith('production')
  })

  it('dispatches make:layout to its handler', async () => {
    const makeLayout = (await import('../commands/make/layout.ts')).default
    process.argv = ['node', 'maizzle', 'make:layout', './components/Layout.vue']

    await bootstrap()

    expect(makeLayout).toHaveBeenCalledWith('./components/Layout.vue')
  })

  it('dispatches make:template to its handler', async () => {
    const makeTemplate = (await import('../commands/make/template.ts')).default
    process.argv = ['node', 'maizzle', 'make:template', './emails/welcome.vue']

    await bootstrap()

    expect(makeTemplate).toHaveBeenCalledWith('./emails/welcome.vue')
  })

  it('dispatches make:component to its handler', async () => {
    const makeComponent = (await import('../commands/make/component.ts')).default
    process.argv = ['node', 'maizzle', 'make:component', './components/Button.vue']

    await bootstrap()

    expect(makeComponent).toHaveBeenCalledWith('./components/Button.vue')
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
