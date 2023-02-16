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

test('it scaffolds a template', async t => {
  await execa.command('node bin/maizzle make:template template.html')

  t.context.folder = 'src/templates'
  const file = `${t.context.folder}/template.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it scaffolds a layout in the specified directory', async t => {
  await execa.command(`node bin/maizzle make:template template.html -d ${t.context.folder}`)

  const file = `${t.context.folder}/template.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it requires a file extension', async t => {
  await execa.command(`node bin/maizzle make:template template -d ${t.context.folder}`)
  t.false(fs.existsSync(`${t.context.folder}/example`))
})

test('it does not overwrite existing files', async t => {
  await execa.command(`node bin/maizzle make:template template.html -d ${t.context.folder}`)
  const {mtimeMs} = fs.statSync(`${t.context.folder}/template.html`)
  await execa.command(`node bin/maizzle make:template template.html -d ${t.context.folder}`)

  t.is(fs.statSync(`${t.context.folder}/template.html`).mtimeMs, mtimeMs)
})
