const test = require('ava')
const execa = require('execa')
const shell = require('shelljs')

test('throws if not in project (build)', async t => {
  t.truthy(shell.exec('node bin/maizzle build'), undefined)
})

test('throws if not in project (serve)', async t => {
  await t.throwsAsync(async () => {
    await execa.command('node bin/maizzle serve')
  }, {instanceOf: Error})
})
