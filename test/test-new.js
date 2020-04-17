const test = require('ava')
const fs = require('fs-extra')
const execa = require('execa')

test('it scaffolds a basic config', async t => {
  const error = await execa('node bin/maizzle new https://github.com/maizzle/fakerepo')

  t.false(fs.existsSync('fakerepo'))
  t.truthy(error.stderr.includes('not a Git repository'))
})
