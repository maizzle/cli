const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')
const inquirer = require('inquirer')

module.exports.scaffold = async (filename, cmd = {}) => {
  if (cmd.args.length === 0) {
    await inquirer
      .prompt([
        {
          name: 'filename',
          message: 'File name',
          default: 'layout.html'
        },
        {
          name: 'directory',
          message: 'Directory to place it in',
          default: 'src/layouts'
        }
      ])
      .then(answers => {
        filename = answers.filename
        cmd.directory = answers.directory
      })
  }

  filename = filename || 'layout.html'
  cmd.directory = cmd.directory || 'src/layouts'

  const spinner = ora()

  if (['', '.'].includes(path.parse(filename).ext)) {
    return spinner.fail(`File name must include an extension, i.e. ${filename}.html`)
  }

  const html = fs.readFileSync(path.resolve(__dirname, '../../stubs/layout.html'), 'utf8')
  const destination = path.resolve(`${cmd.directory}/${filename}`)

  if (fs.existsSync(destination)) {
    return spinner.fail(`File exists: ${destination}`)
  }

  return fs.outputFile(destination, html)
    .then(() => spinner.succeed(`Created new Layout in ${destination}`))
    .catch(() => {})
}
