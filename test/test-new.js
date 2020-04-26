const test = require('ava')
const fs = require('fs-extra')
const execa = require('execa')
const cli = require.resolve('../bin/maizzle')

test.beforeEach(t => {
  t.context.folder = '_temp_' + Math.random().toString(36).slice(2, 9)
})

test.afterEach.always(async t => {
  if (t.context.folder) {
    await fs.remove(t.context.folder)
    delete t.context.folder
  }
})

test('it scaffolds a new project', async t => {
  await execa(cli, ['new', 'https://github.com/maizzle/maizzle.git', t.context.folder, '-d'])

  t.true(fs.existsSync(t.context.folder))
})

test('it fails if repo URL is invalid', async t => {
  const {stderr} = await execa(cli, ['new', 'notagitrepo'])

  t.truthy(stderr.includes('not a Git repository'))
})
