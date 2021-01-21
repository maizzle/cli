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

test('it scaffolds a tailwindcss config', async t => {
  await execa.command('node bin/maizzle make:tailwind tailwind.config.js')

  const file = 'tailwind.config.js'

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)

  await fs.remove('tailwind.config.js')
})

test('it scaffolds a layout in the specified directory', async t => {
  await execa.command(`node bin/maizzle make:tailwind tailwind.config.js -d ${t.context.folder}`)

  const file = `${t.context.folder}/tailwind.config.js`

  t.true(fs.existsSync(file))
  t.true(fs.readFileSync(file, 'utf8').length > 0)
})

test('it requires a file extension', async t => {
  await execa.command(`node bin/maizzle make:tailwind tailwind.config -d ${t.context.folder}`)

  t.false(fs.existsSync(`${t.context.folder}/tailwind.config`))
})

test('it does not overwrite existing files', async t => {
  await execa.command(`node bin/maizzle make:tailwind tailwind.config.js -d ${t.context.folder}`)
  const mtimeMs = fs.statSync(`${t.context.folder}/tailwind.config.js`).mtimeMs
  await execa.command(`node bin/maizzle make:tailwind tailwind.config.js -d ${t.context.folder}`)

  t.is(fs.statSync(`${t.context.folder}/tailwind.config.js`).mtimeMs, mtimeMs)
})
