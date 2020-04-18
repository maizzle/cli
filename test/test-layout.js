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

test('it scaffolds a layout', async t => {
  await execa.command('node bin/maizzle make:layout layout.html')

  t.context.folder = 'src/layouts'
  const file = `${t.context.folder}/layout.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it scaffolds a layout in the specified directory', async t => {
  await execa.command(`node bin/maizzle make:layout layout.html -d ${t.context.folder}`)

  const file = `${t.context.folder}/layout.html`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it requires a file extension', async t => {
  await execa.command('node bin/maizzle make:layout layout')

  t.false(fs.existsSync(`${t.context.folder}/example`))
})

test('it does not overwrite existing files', async t => {
  await execa.command(`node bin/maizzle make:layout layout.html -d ${t.context.folder}`)
  const mtimeMs = fs.statSync(`${t.context.folder}/layout.html`).mtimeMs
  await execa.command(`node bin/maizzle make:layout layout.html -d ${t.context.folder}`)

  t.is(fs.statSync(`${t.context.folder}/layout.html`).mtimeMs, mtimeMs)
})

test('it does not scaffold layout with invalid file name', async t => {
  await execa.command(`node bin/maizzle make:layout lay\0ut.html -d ${t.context.folder}`)
  const error = await t.throwsAsync(fs.readFile(`${t.context.folder}/lay\0ut.html`, 'utf8'))

  t.is(error.code, 'ERR_INVALID_ARG_VALUE')
})
