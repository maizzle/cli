const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

module.exports.scaffold = (env, cmd) => {
  const spinner = ora()

  const config = fs.readFileSync(path.resolve(__dirname, `../../stubs/config/${cmd.full ? 'full' : 'base'}.js`), 'utf8')
  const destination = path.resolve(`${process.cwd()}/config.${env}.js`)

  if (fs.existsSync(destination)) {
    return spinner.fail(`File exists: ${destination}`)
  }

  return fs.outputFile(destination, config.replace('build_local', `build_${env}`))
    .then(() => spinner.succeed(`Created new Config in ${destination}`))
    .catch(error => {
      spinner.fail(error.message)
      throw error
    })
}
