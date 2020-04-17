const test = require('ava')
const execa = require('execa')

test('throws if not in project (build)', async t => {
  const error = await t.throwsAsync(execa('node bin/maizzle build'))

  t.is(error.code, 'ENOENT')
  t.truthy(error.stderr.includes('Cannot find module'))
})

test('throws if not in project (serve)', async t => {
  const error = await t.throwsAsync(execa('node bin/maizzle serve'))

  t.is(error.code, 'ENOENT')
  t.truthy(error.stderr.includes('Cannot find module'))
})
