import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any)

// Track text() calls so we can inspect validate functions
const textCalls: any[] = []
const confirmCalls: any[] = []

vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  cancel: vi.fn(),
  text: vi.fn((opts: any) => {
    textCalls.push(opts)
    return opts.placeholder || 'mock-value'
  }),
  confirm: vi.fn((opts: any) => {
    confirmCalls.push(opts)
    return opts.initialValue ?? false
  }),
  group: vi.fn(async (fields: Record<string, () => any>) => {
    const result: Record<string, any> = {}
    for (const [key, fn] of Object.entries(fields)) {
      result[key] = await fn()
    }
    return result
  }),
}))

import makeConfig from '../commands/make/config.ts'
import makeLayout from '../commands/make/layout.ts'
import makeTemplate from '../commands/make/template.ts'
import makeComponent from '../commands/make/component.ts'

let tempDir: string
let originalCwd: string

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'maizzle-cli-interactive-'))
  originalCwd = process.cwd()
  process.chdir(tempDir)
  mockExit.mockClear()
  textCalls.length = 0
  confirmCalls.length = 0
})

afterEach(() => {
  process.chdir(originalCwd)
  rmSync(tempDir, { recursive: true, force: true })
})

describe('make:config interactive', () => {
  it('prompts for name and creates config file', async () => {
    await makeConfig()

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(join(tempDir, 'production.config.ts'))).toBe(true)
  })

  it('validates empty name', async () => {
    await makeConfig()

    const nameField = textCalls.find(c => c.message === 'Config name')
    expect(nameField).toBeDefined()
    expect(nameField.validate('')).toBe('Please enter a config name.')
    expect(nameField.validate('valid')).toBeUndefined()
  })

  it('validates name with spaces', async () => {
    await makeConfig()

    const nameField = textCalls.find(c => c.message === 'Config name')
    expect(nameField.validate('has space')).toBe('Use - instead of spaces.')
  })
})

describe('make:layout interactive', () => {
  it('prompts for filename and path, creates layout', async () => {
    await makeLayout()

    expect(mockExit).toHaveBeenCalledWith(0)
  })

  it('validates empty filename', async () => {
    await makeLayout()

    const field = textCalls.find(c => c.message === 'File name')
    expect(field.validate('')).toBe('Please enter a file name.')
    expect(field.validate('Layout.vue')).toBeUndefined()
  })

  it('validates empty path', async () => {
    await makeLayout()

    const field = textCalls.find(c => c.message === 'Directory to place it in')
    expect(field.validate('')).toBe('Please enter a path.')
  })

  it('accepts any non-empty path', async () => {
    await makeLayout()

    const field = textCalls.find(c => c.message === 'Directory to place it in')
    expect(field.validate('components')).toBeUndefined()
    expect(field.validate('./components')).toBeUndefined()
  })
})

describe('make:template interactive', () => {
  it('prompts for filename and path, creates template', async () => {
    await makeTemplate()

    expect(mockExit).toHaveBeenCalledWith(0)
  })

  it('validates empty filename', async () => {
    await makeTemplate()

    const field = textCalls.find(c => c.message === 'File name')
    expect(field.validate('')).toBe('Please enter a file name.')
  })

  it('validates path', async () => {
    await makeTemplate()

    const field = textCalls.find(c => c.message === 'Directory to place it in')
    expect(field.validate('')).toBe('Please enter a path.')
    expect(field.validate('emails')).toBeUndefined()
    expect(field.validate('./emails')).toBeUndefined()
  })
})

describe('make:component interactive', () => {
  it('prompts for filename and path, creates component', async () => {
    await makeComponent()

    expect(mockExit).toHaveBeenCalledWith(0)
  })

  it('validates empty filename', async () => {
    await makeComponent()

    const field = textCalls.find(c => c.message === 'File name')
    expect(field.validate('')).toBe('Please enter a file name.')
  })

  it('validates path', async () => {
    await makeComponent()

    const field = textCalls.find(c => c.message === 'Directory to place it in')
    expect(field.validate('')).toBe('Please enter a path.')
    expect(field.validate('components')).toBeUndefined()
    expect(field.validate('./components')).toBeUndefined()
  })
})
