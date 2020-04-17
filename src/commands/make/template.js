const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

module.exports.scaffold = (filename, cmdObj) => {
  const spinner = ora()

  if (['', '.'].includes(path.parse(filename).ext)) {
    spinner.fail(`<filename> argument must include an extension, i.e. ${filename}.html`)
    process.exit(1)
  }

  const template = fs.readFileSync(path.resolve(__dirname, '../../stubs/template.html'), 'utf8')
  const destination = cmdObj.directory
    ? path.resolve(`${cmdObj.directory}/${filename}`)
    : path.resolve(`${process.cwd()}/src/templates/${filename}`)

  if (fs.existsSync(destination)) {
    spinner.fail(`File exists: ${destination}`)
    process.exit(1)
  }

  fs.outputFile(destination, template)
    .then(() => spinner.succeed(`Created new Template in ${destination}`))
    .catch(error => spinner.fail(error.message))
}
