import color from 'picocolors'
import * as p from '@clack/prompts'
import { scaffold, onCancel } from './scaffold.ts'

export default async function makeLayout(filePath?: string) {
  if (filePath) {
    await scaffold(filePath, 'Layout.vue')
    return
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:layout '))}`)

  const result = await p.group(
    {
      filename: () =>
        p.text({
          message: 'File name',
          placeholder: 'Layout.vue',
          validate: value => {
            if (!value) return 'Please enter a file name.'
          },
        }),
      path: () =>
        p.text({
          message: 'Directory to place it in',
          placeholder: './components',
          initialValue: './components',
          validate: value => {
            if (!value) return 'Please enter a path.'
          },
        }),
    },
    { onCancel },
  )

  await scaffold(`${result.path}/${result.filename}`, 'Layout.vue')
}
