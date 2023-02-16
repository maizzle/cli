const test = require('ava')
const execa = require('execa')

test('throws if not in project (serve)', async t => {
  await t.throwsAsync(async () => {
    await execa.command('node bin/maizzle serve')
  }, {instanceOf: Error})
})
