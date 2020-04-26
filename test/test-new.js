const test = require('ava')
const fs = require('fs-extra')
const execa = require('execa')

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
  await execa.command(`node bin/maizzle new https://github.com/maizzle/maizzle.git ${t.context.folder} -d`)

  t.true(fs.existsSync(t.context.folder))
})

test('it scaffolds from GitHub using user/repo argument', async t => {
  await execa.command(`node bin/maizzle new maizzle/maizzle ${t.context.folder} -d`)

  t.true(fs.existsSync(t.context.folder))
})

test('it scaffolds a default starter', async t => {
  await execa.command(`node bin/maizzle new nunjucks ${t.context.folder} -d`)

  t.true(fs.existsSync(t.context.folder))
})

test('it fails if repo URL is invalid', async t => {
  const {stderr} = await execa.command('node bin/maizzle new notagitrepo')

  t.truthy(stderr.includes('not a Git repository'))
})
