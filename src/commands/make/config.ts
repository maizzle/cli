import color from 'picocolors'
import * as p from '@clack/prompts'
import { scaffold, onCancel } from './scaffold.ts'

export default async function makeConfig(name?: string) {
  if (name) {
    await scaffold(`${name}.config.ts`, 'config.ts')
    return
  }

  p.intro(`${color.bgCyan(color.black(' maizzle make:config '))}`)

  const result = await p.group(
    {
      name: () =>
        p.text({
          message: 'Config name',
          placeholder: 'production',
          validate: value => {
            if (!value) return 'Please enter a config name.'
            if (value.includes(' ')) return 'Use - or . instead of spaces.'
          },
        }),
    },
    { onCancel },
  )

  await scaffold(`${result.name}.config.ts`, 'config.ts')
}
