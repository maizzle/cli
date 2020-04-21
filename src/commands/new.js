const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const chalk = require('chalk')
const inquirer = require('inquirer')
const {isGitURL} = require('../utils')

module.exports.scaffold = async (repo, dir, cmd) => {
  if (cmd.args.length === 0) {
    await inquirer
      .prompt([
        {
          name: 'folder',
          message: 'Project directory name',
          default: 'maizzle'
        },
        {
          name: 'starter',
          type: 'confirm',
          message: 'Do you want to use a custom Starter',
          default: false
        },
        {
          name: 'repo',
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
        repo = answers.repo
        dir = answers.folder
        cmd.deps = answers.dependencies
      })
  }

  repo = repo || 'https://github.com/maizzle/maizzle.git'
  dir = dir || path.parse(repo).name

  const dest = path.join(process.cwd(), dir)
  let spinner = ora(`Crafting new Maizzle project in ${dest}...`).start()

  if (!isGitURL(repo)) {
    spinner.fail(`not a Git repository: ${repo}`)
    process.exit()
  }

  execa('git', ['clone', repo, dir])
    .then(async () => {
      spinner = spinner.stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Cloned Git repository'})
      process.chdir(dest)
      await fs.remove('.git')
      await fs.remove('.github')

      if (cmd.deps) {
        spinner.start('Installing NPM dependencies')

        return execa('npm', ['install'])
          .then(() => {
            return spinner
              .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Installed NPM dependencies'})
              .succeed('Maizzle project initialized')
              .info(`Now \`cd ${dir}\` and start building your emails`)
          })
          .catch(({stderr}) => spinner.fail(stderr))
      }

      return spinner
        .stopAndPersist({symbol: `${chalk.green('√')}`, text: 'Installed NPM dependencies'})
        .succeed('Maizzle project initialized')
        .info(`Remember to install the dependencies by running \`cd ${dir}\` and then \`npm install\``)
    })
    .catch(({stderr}) => spinner.fail(stderr))
}
