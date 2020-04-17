const ora = require('ora')
const path = require('path')
const fs = require('fs-extra')

module.exports.scaffold = (filename, cmd) => {
  const spinner = ora()

  if (['', '.'].includes(path.parse(filename).ext)) {
    spinner.fail(`<filename> argument must include an extension, i.e. ${filename}.html`)
    process.exit(1)
  }

  const layout = fs.readFileSync(path.resolve(__dirname, '../../stubs/layout.html'), 'utf8')
  const destination = cmd.directory ? path.resolve(`${cmd.directory}/${filename}`) : path.resolve(`${process.cwd()}/src/layouts/${filename}`)

  if (fs.existsSync(destination)) {
    spinner.fail(`File exists: ${destination}`)
    process.exit(1)
  }

  fs.outputFile(destination, layout)
    .then(() => spinner.succeed(`Created new Layout in ${destination}`))
    .catch(error => spinner.fail(error.message))
}
