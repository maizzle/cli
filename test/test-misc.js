const test = require('ava')
const execa = require('execa')
const pkg = require('../package.json')
const cli = require.resolve('../bin/maizzle')

test('displays CLI version', async t => {
  const {stdout} = await execa(cli, ['-v'])

  t.is(stdout, `CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`)
})

test('shows help on invalid command', async t => {
  const {stderr} = await t.throwsAsync(execa(cli, ['foo']))

  t.is(stderr, 'Invalid command: foo\nSee --help for a list of available commands.')
})
