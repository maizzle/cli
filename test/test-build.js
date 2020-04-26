const test = require('ava')
const execa = require('execa')
const cli = require.resolve('../bin/maizzle')

test('throws if not in project (build)', async t => {
  const {stderr} = await t.throwsAsync(execa(cli, ['build']))

  t.truthy(stderr.includes('Cannot find module'))
})

test('throws if not in project (serve)', async t => {
  const {stderr} = await t.throwsAsync(execa(cli, ['serve']))

  t.truthy(stderr.includes('Cannot find module'))
})
