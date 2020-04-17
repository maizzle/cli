const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

module.exports.scaffold = (filename, cmd = {}) => {
  const spinner = ora()

  if (['', '.'].includes(path.parse(filename).ext)) {
    return spinner.fail(`<filename> argument must include an extension, i.e. ${filename}.html`)
  }

  const template = fs.readFileSync(path.resolve(__dirname, '../../stubs/template.html'), 'utf8')
  const destination = cmd.directory ? path.resolve(`${cmd.directory}/${filename}`) : path.resolve(`${process.cwd()}/src/templates/${filename}`)

  if (fs.existsSync(destination)) {
    return spinner.fail(`File exists: ${destination}`)
  }

  return fs.outputFile(destination, template)
    .then(() => spinner.succeed(`Created new Template in ${destination}`))
    .catch(error => {
      spinner.fail(error.message)
      throw error
    })
}
