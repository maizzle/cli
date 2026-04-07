import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { existsSync, readFileSync, mkdtempSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

// Mock process.exit to prevent it from killing the test runner
const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any)

// Mock @clack/prompts to avoid interactive prompts in tests
vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  cancel: vi.fn(),
  group: vi.fn(),
  text: vi.fn(),
  confirm: vi.fn(),
}))

import makeConfig from '../commands/make/config.ts'
import makeLayout from '../commands/make/layout.ts'
import makeTemplate from '../commands/make/template.ts'
import makeComponent from '../commands/make/component.ts'

let tempDir: string

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'maizzle-cli-test-'))
  mockExit.mockClear()
})

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true })
})

describe('make:config', () => {
  it('creates a config file with the given name', async () => {
    const filePath = join(tempDir, 'production.config.ts')

    await makeConfig(join(tempDir, 'production'))

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)

    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('defineConfig')
    expect(content).toContain('@maizzle/framework')
  })

  it('exits with 1 if config file already exists', async () => {
    const filePath = join(tempDir, 'production.config.ts')

    await makeConfig(join(tempDir, 'production'))
    mockExit.mockClear()

    await makeConfig(join(tempDir, 'production'))

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})

describe('make:layout', () => {
  it('creates a layout file at the given path', async () => {
    const filePath = join(tempDir, 'Layout.vue')

    await makeLayout(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)

    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('<slot />')
    expect(content).toContain('@import "@maizzle/tailwindcss"')
    expect(content).toContain('defineProps')
  })

  it('creates nested directories if needed', async () => {
    const filePath = join(tempDir, 'components', 'nested', 'Layout.vue')

    await makeLayout(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)
  })

  it('exits with 1 if file already exists', async () => {
    const filePath = join(tempDir, 'Layout.vue')

    await makeLayout(filePath)
    mockExit.mockClear()

    await makeLayout(filePath)

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})

describe('make:template', () => {
  it('creates a template file at the given path', async () => {
    const filePath = join(tempDir, 'welcome.vue')

    await makeTemplate(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)

    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('<Layout>')
    expect(content).toContain('<template>')
  })

  it('creates nested directories if needed', async () => {
    const filePath = join(tempDir, 'emails', 'transactional', 'welcome.vue')

    await makeTemplate(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)
  })

  it('exits with 1 if file already exists', async () => {
    const filePath = join(tempDir, 'welcome.vue')

    await makeTemplate(filePath)
    mockExit.mockClear()

    await makeTemplate(filePath)

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})

describe('make:component', () => {
  it('creates a component file at the given path', async () => {
    const filePath = join(tempDir, 'Button.vue')

    await makeComponent(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)

    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('<slot />')
    expect(content).toContain('defineProps')
  })

  it('creates nested directories if needed', async () => {
    const filePath = join(tempDir, 'components', 'ui', 'Button.vue')

    await makeComponent(filePath)

    expect(mockExit).toHaveBeenCalledWith(0)
    expect(existsSync(filePath)).toBe(true)
  })

  it('exits with 1 if file already exists', async () => {
    const filePath = join(tempDir, 'Button.vue')

    await makeComponent(filePath)
    mockExit.mockClear()

    await makeComponent(filePath)

    expect(mockExit).toHaveBeenCalledWith(1)
  })
})
