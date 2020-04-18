const test = require('ava')
const fs = require('fs-extra')
const execa = require('execa')

test.beforeEach(t => {
  t.context.file = ''
})

test.afterEach.always(async t => {
  if (t.context.file) {
    await fs.remove(t.context.file)
    t.context.file = ''
  }
})

test('it scaffolds a basic config', async t => {
  await execa.command('node bin/maizzle make:config basic')

  t.context.file = 'config.basic.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.is(config.build.destination.path, 'build_basic')
})

test('it scaffolds a full config', async t => {
  await execa.command('node bin/maizzle make:config full -f')

  t.context.file = 'config.full.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.is(config.build.assets.destination, 'images')
})

test('it does not overwrite existing files', async t => {
  await execa.command('node bin/maizzle make:config production')
  await execa.command('node bin/maizzle make:config production -f')

  t.context.file = 'config.production.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.falsy(config.build.assets)
})

test('it does not scaffold template with invalid file name', async t => {
  const char = 'TRAVIS' in process.env && 'CI' in process.env ? '\0' : '>'
  const result = await execa.command(`node bin/maizzle make:config f${char}rk`)

  t.true(result.stderr.includes('Cannot create'))
})
