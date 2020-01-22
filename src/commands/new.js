const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const clone = require('git-clone')
const isGitURL = require('is-git-url')
const exec = require("child_process").exec

module.exports.scaffold = (dir, repo, cmdObj) => {

  if (isGitURL(dir)) {
    repo = dir
    dir = path.parse(repo).name
  } else {
    dir = dir || 'maizzle'
    repo = repo || 'https://github.com/maizzle/maizzle.git'
  }

  if (!isGitURL(repo)) {
    console.log(`Error: Invalid Git repository URL (${repo})`)
    process.exit()
  }

  let dest = path.join(process.cwd(), dir)
  let spinner = ora(`Crafting new Maizzle project in ${dest}...`).start()

  if (fs.existsSync(dest)) {
    return spinner.fail(`Error: ${dest} directory already exists!`)
  }

  return clone(repo, dest, async () => {
    try {
      process.chdir(dest)

      await fs.remove('.git')
      await fs.remove('.github')

      if (cmdObj.deps) {
        spinner.start('Project downloaded, installing NPM dependencies...')

        exec("npm install", (err, stdout, stderr) => {
          if (err) {
            return spinner.fail(err)
          }
          spinner.succeed('Maizzle project initialized, go create awesome emails!')
        })
      } else {
        spinner.succeed('Maizzle project initialized (without NPM dependencies).')
      }
    } catch (error) {
      spinner.fail(error)
    }
  })
}
