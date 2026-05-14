import color from 'picocolors'
import * as p from '@clack/prompts'
import { scaffold, onCancel } from './scaffold.ts'

export default async function makeConfig(name?: string) {
  if (name) {
    await scaffold(name, 'config.ts')
    return
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:config '))}`)

  const result = await p.group(
    {
      name: () =>
        p.text({
          message: 'File name',
          placeholder: 'i.e. maizzle.config.ts',
          validate: value => {
            if (!value) return 'Please enter a file name.'
            if (value.includes(' ')) return 'Use - or . instead of spaces.'
            if (!/\.(js|ts)$/.test(value)) return 'File must end in .js or .ts'
          },
        }),
    },
    { onCancel },
  )

  await scaffold(result.name as string, 'config.ts')
}
