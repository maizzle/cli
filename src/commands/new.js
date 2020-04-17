const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const execa = require('execa')
const {isGitURL} = require('../utils')

module.exports.scaffold = async (repo, dir, cmdObj) => {
  repo = repo || 'https://github.com/maizzle/maizzle.git'
  dir = dir || path.parse(repo).name

  const dest = path.join(process.cwd(), dir)
  const spinner = ora(`Crafting new Maizzle project in ${dest}...`).start()

  if (!isGitURL(repo)) {
    spinner.fail(`fatal: repository '${repo}' not found`)
    process.exit()
  }

  execa('git', ['clone', repo, dir])
    .then(async () => {
      process.chdir(dest)
      await fs.remove('.git')
      await fs.remove('.github')

      if (cmdObj.deps) {
        spinner.text = 'Project downloaded, installing NPM dependencies...'

        execa('npm', ['install'])
          .then(() => spinner.succeed('Maizzle project initialized, go create awesome emails!'))
          .catch(({stderr}) => spinner.fail(stderr))
      } else {
        spinner.succeed(`Maizzle project initialized. Remember to install the dependencies by running \`cd ${dir}\` and then \`npm install\``)
      }
    })
    .catch(({stderr}) => spinner.fail(stderr))
}
