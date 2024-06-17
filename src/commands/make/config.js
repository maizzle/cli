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

async function scaffold(filePath, type = 'base') {
  let __dirname = dirname(fileURLToPath(import.meta.url))

  try {
    await lstat(filePath)
    p.outro(color.red(`ERROR: ${filePath} already exists.`))
    process.exit(1)
  } catch {
    let html = await readFile(resolve(__dirname, `stubs/config/${type}.js`), 'utf-8')

    const pathExists = await lstat(dirname(filePath)).catch(() => false)

    if (!pathExists) {
      await mkdir(dirname(filePath), { recursive: true })
    }

    await writeFile(filePath, html)

    p.outro(`${filePath} has been created.`)
    process.exit(0)
  }
}

export default async function(environment, type) {
  // File path provided, scaffold immediately
  if (environment) {
    await scaffold(environment, type && 'full')
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:config '))}`)

  let template = await p.group(
    {
      environment: () =>
        p.text({
          message: 'Environment name',
          placeholder: 'production',
          validate: value => {
            if (!value) return 'Please enter an environment name.'
            if (value.includes(' ')) return 'Use - instead of spaces.'
          },
        }),
      full: () =>
        p.confirm({
          message: 'Scaffold a full config?',
          initialValue: false,
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
  if (template.full) {
    await scaffold(`config.${template.environment}.js`, 'full')
  } else {
    await scaffold(`config.${template.environment}.js`)
  }
}
