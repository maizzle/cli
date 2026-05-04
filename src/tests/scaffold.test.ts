import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { existsSync, readFileSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

const mockExit = vi.spyOn(process, 'exit').mockImplementation((() => {}) as any)

vi.mock('@clack/prompts', () => ({
  intro: vi.fn(),
  outro: vi.fn(),
  cancel: vi.fn(),
  group: vi.fn(),
  text: vi.fn(),
  confirm: vi.fn(),
}))

import { scaffold, onCancel } from '../commands/make/scaffold.ts'
import * as p from '@clack/prompts'

let tempDir: string

beforeEach(() => {
  tempDir = mkdtempSync(join(tmpdir(), 'maizzle-scaffold-test-'))
  mockExit.mockClear()
})

afterEach(() => {
  rmSync(tempDir, { recursive: true, force: true })
})

describe('scaffold', () => {
  it('writes the stub content to the target file', async () => {
    const filePath = join(tempDir, 'test.vue')

    await scaffold(filePath, 'template.vue')

    expect(existsSync(filePath)).toBe(true)
    const content = readFileSync(filePath, 'utf-8')
    expect(content).toContain('<Layout>')
  })

  it('creates parent directories recursively', async () => {
    const filePath = join(tempDir, 'a', 'b', 'c', 'test.vue')

    await scaffold(filePath, 'component.vue')

    expect(existsSync(filePath)).toBe(true)
  })

  it('calls process.exit(1) if file already exists', async () => {
    const filePath = join(tempDir, 'exists.vue')
    writeFileSync(filePath, 'existing content')

    await scaffold(filePath, 'template.vue')

    expect(mockExit).toHaveBeenCalledWith(1)
    // Original content should be preserved
    expect(readFileSync(filePath, 'utf-8')).toBe('existing content')
  })

  it('calls process.exit(0) on success', async () => {
    const filePath = join(tempDir, 'new.vue')

    await scaffold(filePath, 'template.vue')

    expect(mockExit).toHaveBeenCalledWith(0)
  })
})

describe('onCancel', () => {
  it('calls p.cancel and exits with 0', () => {
    onCancel()

    expect(p.cancel).toHaveBeenCalledWith('Canceled.')
    expect(mockExit).toHaveBeenCalledWith(0)
  })
})
