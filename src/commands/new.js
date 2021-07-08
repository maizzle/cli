const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {isGitURL} = require('../utils')

module.exports.scaffold = async (starter, directory, options, command) => {
  if (command.args.length === 0) {
    await inquirer
      .prompt([
        {
          name: 'directory',
          message: 'Project directory name',
          default: 'maizzle'
        },
        {
          name: 'starter',
          type: 'confirm',
          message: 'Do you want to use a starter',
          default: false
        },
        {
          name: 'repository',
          message: 'Starter Git repository URL',
          when: answers => answers.starter
        },
        {
          name: 'dependencies',
          type: 'confirm',
          message: 'Install NPM dependencies',
          default: true
        }
      ])
      .then(answers => {
        directory = answers.directory
        starter = answers.repository
        options.deps = answers.dependencies
      })
  }

  const starters = new Set(['amp4email', 'nunjucks'])

  if (/^([\w-]+)\//i.test(starter)) {
    starter = `https://github.com/${starter}.git`
  } else if (starters.has(starter)) {
    starter = `https://github.com/maizzle/starter-${starter}.git`
  } else {
    starter = starter || 'https://github.com/maizzle/maizzle.git'
  }

  directory = directory || path.parse(starter).name

  const dest = path.join(process.cwd(), directory)

  let spinner = ora(`Crafting new Maizzle project in ${dest}...`).start()

  if (!isGitURL(starter)) {
    spinner.fail(`not a Git repository: ${starter}`)
    process.exit()
  }

  execa('git', ['clone', starter, directory, '--single-branch'])
    .then(async () => {
      spinner = spinner.stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Cloned Git repository'})
      process.chdir(dest)
      await fs.remove('.git')
      await fs.remove('.github')

      if (options.deps) {
        spinner.start('Installing NPM dependencies')

        return execa('npm', ['install'])
          .then(() => {
            return spinner
              .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Installed NPM dependencies'})
              .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Maizzle project initialized'})
              .info(`Now \`cd ${directory}\` and start building your emails`)
          })
          .catch(error => spinner.fail(error.stderr))
      }

      return spinner
        .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Installed NPM dependencies'})
        .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Maizzle project initialized'})
        .info(`Remember to install the dependencies by running \`cd ${directory}\` and then \`npm install\``)
    })
}
