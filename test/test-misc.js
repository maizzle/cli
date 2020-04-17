const test = require('ava')
const execa = require('execa')
const pkg = require('../package.json')

test('displays CLI version', async t => {
  const result = await execa('node bin/maizzle -v')

  t.is(result.stdout, `CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`)
})

test('shows help on invalid command', async t => {
  const error = await t.throwsAsync(execa('node bin/maizzle inexistent'))

  t.is(error.code, 'ENOENT')
  t.truthy(error.stderr.includes('Invalid command: inexistent'))
})
