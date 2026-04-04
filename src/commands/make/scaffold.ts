import { mkdir, lstat, readFile, writeFile } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import color from 'picocolors'
import * as p from '@clack/prompts'

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function scaffold(filePath: string, stubName: string) {
  try {
    await lstat(filePath)
    p.outro(color.red(`ERROR: ${filePath} already exists.`))
    process.exit(1)
  } catch {
    const content = await readFile(resolve(__dirname, `stubs/${stubName}`), 'utf-8')

    const dir = dirname(filePath)
    const dirExists = await lstat(dir).catch(() => false)

    if (!dirExists) {
      await mkdir(dir, { recursive: true })
    }

    await writeFile(filePath, content)

    p.outro(`${filePath} has been created.`)
    process.exit(0)
  }
}

export function onCancel() {
  p.cancel('Cancelled.')
  process.exit(0)
}
