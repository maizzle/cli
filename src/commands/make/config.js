const path = require('path')
const ora = require('ora')
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports.scaffold = async (env, options, command) => {
  if (command.args.length === 0) {
    await inquirer
      .prompt([
        {
          name: 'environment',
          message: 'Environment name',
          default: 'production',
        },
        {
          name: 'full',
          type: 'confirm',
          message: 'Scaffold a full config',
          default: false,
        },
      ])
      .then(answers => {
        env = answers.environment
        options.full = answers.full
      })
  }

  env = env || 'production'
  options.full = options.full || false

  const spinner = ora()
  const destination = path.resolve(`${process.cwd()}/config.${env}.js`)
  const config = fs.readFileSync(path.resolve(__dirname, `../../stubs/config/${options.full ? 'full' : 'base'}.js`), 'utf8')

  if (fs.existsSync(destination)) {
    return spinner.fail(`File exists: ${destination}`)
  }

  return fs.outputFile(destination, config.replace('build_local', `build_${env}`))
    .then(() => spinner.succeed(`Created new config file in ${destination}`))
    .catch(error => {
      throw error
    })
}
