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

async function scaffold(filePath, stubPath = 'stubs/layout.html') {
  let __dirname = dirname(fileURLToPath(import.meta.url))

  try {
    await lstat(filePath)
    p.outro(color.red(`ERROR: ${filePath} already exists.`))
    process.exit(1)
  } catch {
    let html = await readFile(resolve(__dirname, stubPath), 'utf-8')

    const pathExists = await lstat(dirname(filePath)).catch(() => false)

    if (!pathExists) {
      await mkdir(dirname(filePath), { recursive: true })
    }

    await writeFile(filePath, html)

    p.outro(`${filePath} has been created.`)
    process.exit(0)
  }
}

export default async function(filePath) {
  // File path provided, scaffold immediately
  if (filePath) {
    await scaffold(filePath)
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:layout '))}`)

  let template = await p.group(
    {
      filename: () =>
        p.text({
          message: 'File name',
          validate: value => {
            if (!value) return 'Please enter a file name.'
          },
        }),
      path: () =>
        p.text({
          message: 'Directory to place it in',
          placeholder: './src/layouts',
          validate: value => {
            if (!value) return 'Please enter a path.'
            if (value[0] !== '.') return 'Please enter a relative path.'
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

  // Scaffold the template
  await scaffold(`${template.path}/${template.filename}`)
}
