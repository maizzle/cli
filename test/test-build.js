const test = require('ava')
const execa = require('execa')

test('throws if not in project (build)', async t => {
  const {stderr} = await execa.command('node bin/maizzle build')

  t.truthy(stderr.includes('Cannot find module'))
})

test('throws if not in project (serve)', async t => {
  const {stderr} = await t.throwsAsync(execa.command('node bin/maizzle serve'))

  t.truthy(stderr.includes('Cannot find module'))
})
