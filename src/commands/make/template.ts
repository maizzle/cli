import color from 'picocolors'
import * as p from '@clack/prompts'
import { scaffold, onCancel } from './scaffold.ts'

export default async function makeTemplate(filePath?: string) {
  if (filePath) {
    await scaffold(filePath, 'template.vue')
    return
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:template '))}`)

  const result = await p.group(
    {
      filename: () =>
        p.text({
          message: 'File name',
          placeholder: 'welcome.vue',
          validate: value => {
            if (!value) return 'Please enter a file name.'
          },
        }),
      path: () =>
        p.text({
          message: 'Directory to place it in',
          placeholder: './emails',
          validate: value => {
            if (!value) return 'Please enter a path.'
            if (value[0] !== '.') return 'Please enter a relative path.'
          },
        }),
    },
    { onCancel },
  )

  await scaffold(`${result.path}/${result.filename}`, 'template.vue')
}
