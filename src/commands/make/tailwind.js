import {
  mkdir,
  lstat,
  readFile,
  writeFile
} from 'node:fs/promises'
import color from 'picocolors'
import process from 'node:process'
import * as p from '@clack/prompts'
import { fileURLToPath } from 'url'
import { resolve, dirname } from 'pathe'

async function scaffold(filePath) {
  let __dirname = dirname(fileURLToPath(import.meta.url))

  try {
    await lstat(filePath)
    p.outro(color.red(`ERROR: ${filePath} already exists.`))
    process.exit(1)
  } catch {
    let html = await readFile(resolve(__dirname, `stubs/config/tailwind.config.js`), 'utf-8')

    const pathExists = await lstat(dirname(filePath)).catch(() => false)

    if (!pathExists) {
      await mkdir(dirname(filePath), { recursive: true })
    }

    await writeFile(filePath, html)

    p.outro(`${filePath} has been created.`)
    process.exit(0)
  }
}

export default async function(filename) {
  // File name provided, scaffold immediately
  if (filename) {
    await scaffold(filename)
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:tailwind '))}`)

  let template = await p.group(
    {
      filename: () =>
        p.text({
          message: 'File name',
          placeholder: 'tailwind.config.js',
          validate: value => {
            if (!value) return 'Please enter a file name.'
            if (value.includes(' ')) return 'Use - instead of spaces.'
          },
        }),
    },
    {
      onCancel: () => {
        p.cancel('💀')
        process.exit(0)
      },
    }
  )

  // Scaffold the config file
  await scaffold(template.filename)
}
