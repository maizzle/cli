const test = require('ava')
const execa = require('execa')

test('throws if not in project (build)', async t => {
  const {stderr} = await execa.command('node bin/maizzle build')

  t.truthy(stderr.includes('Error: Framework not found'))
})

test('throws if not in project (serve)', async t => {
  const {stderr} = await execa.command('node bin/maizzle serve')

  t.truthy(stderr.includes('Error: Framework not found'))
})
