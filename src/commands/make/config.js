const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports.scaffold = async (env, cmd = {}) => {
  if (cmd.args.length === 0) {
    await inquirer
      .prompt([
        {
          name: 'environment',
          message: 'Environment name',
          default: 'production'
        },
        {
          name: 'full',
          type: 'confirm',
          message: 'Scaffold a full config',
          default: false
        }
      ])
      .then(answers => {
        env = answers.environment
        cmd.full = answers.full
      })
  }

  env = env || 'production'
  cmd.full = cmd.full || false

  const spinner = ora()
  const destination = path.resolve(`${process.cwd()}/config.${env}.js`)
  const config = fs.readFileSync(path.resolve(__dirname, `../../stubs/config/${cmd.full ? 'full' : 'base'}.js`), 'utf8')

  if (fs.existsSync(destination)) {
    return spinner.fail(`File exists: ${destination}`)
  }

  return fs.outputFile(destination, config.replace('build_local', `build_${env}`))
    .then(() => spinner.succeed(`Created new Config in ${destination}`))
    .catch(() => {})
}
