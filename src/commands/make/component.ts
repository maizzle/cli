import color from 'picocolors'
import * as p from '@clack/prompts'
import { scaffold, onCancel } from './scaffold.ts'

export default async function makeComponent(filePath?: string) {
  if (filePath) {
    await scaffold(filePath, 'component.vue')
    return
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:component '))}`)

  const result = await p.group(
    {
      filename: () =>
        p.text({
          message: 'File name',
          placeholder: 'Button.vue',
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

  await scaffold(`${result.path}/${result.filename}`, 'component.vue')
}
