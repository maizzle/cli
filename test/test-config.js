const test = require('ava')
const fs = require('fs-extra')
const Config = require('../src/commands/make/config')

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
  await Config.scaffold('basic', {full: false})

  t.context.file = 'config.basic.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.is(config.build.destination.path, 'build_basic')
})

test('it scaffolds a full config', async t => {
  await Config.scaffold('full', {full: true})

  t.context.file = 'config.full.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.is(config.build.assets.destination, 'images')
})

test('it does not overwrite existing files', async t => {
  await Config.scaffold('production', {full: false})
  await Config.scaffold('production', {full: true})

  t.context.file = 'config.production.js'
  const config = require(`../${t.context.file}`)

  t.true(fs.existsSync(t.context.file))
  t.falsy(config.build.assets)
})

test('throws if invalid file name is used', async t => {
  await t.throwsAsync(async () => {
    await Config.scaffold('*', {full: false})
  }, {instanceOf: Error, code: 'ENOENT'})
})
