const test = require('ava')
const fs = require('fs-extra')
const Template = require('../src/commands/make/template')

test.beforeEach(t => {
  t.context.folder = '_temp_' + Math.random().toString(36).slice(2, 9)
})

test.afterEach.always(async t => {
  if (t.context.folder) {
    await fs.remove(t.context.folder)
    delete t.context.folder
  }
})

test('it scaffolds a template', async t => {
  await Template.scaffold('template.html')

  t.context.folder = 'src/templates'
  const file = `${t.context.folder}/template.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it scaffolds a layout in the specified directory', async t => {
  await Template.scaffold('template.html', {directory: t.context.folder})

  const file = `${t.context.folder}/template.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it requires a file extension', async t => {
  await Template.scaffold('example', {directory: t.context.folder})
  t.false(fs.existsSync(`${t.context.folder}/example`))
})

test('it does not overwrite existing files', async t => {
  await Template.scaffold('template.html', {directory: t.context.folder})
  const mtimeMs = fs.statSync(`${t.context.folder}/template.html`).mtimeMs
  await Template.scaffold('template.html', {directory: t.context.folder})

  t.is(fs.statSync(`${t.context.folder}/template.html`).mtimeMs, mtimeMs)
})

test('throws if invalid file name is used', async t => {
  await t.throwsAsync(async () => {
    await Template.scaffold('*.html', {directory: t.context.folder})
  }, {instanceOf: Error, code: 'ENOENT'})
})
