const fs = require('fs-extra')
const path = require('path')
const cli = require('commander')
const importCwd = require('import-cwd')
const Project = require('./commands/new')

module.exports = () => {
  cli
    .command('new [path] [repo]')
    .description('scaffold a new Maizzle project')
    .option('-d, --no-deps', `Don't install NPM dependencies`)
    .action((path, repo, cmdObj) => Project.scaffold(path, repo, cmdObj))

  cli
    .command('make:layout <filename>')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Layout')
    .action((filename, cmdObj) => {
      if (path.parse(filename).ext === '') {
        throw(`Error: <filename> argument must have an extension, i.e. ${filename}.html`)
      }

      try {
        const layout = fs.readFileSync(`${__dirname}/stubs/layout.njk`, 'utf-8')
        const destination = cmdObj.directory ? path.resolve(`${cmdObj.directory}/${filename}`) : path.resolve(`${process.cwd()}/src/layouts/${filename}`)

        if (fs.existsSync(destination)) {
          throw(`Error: ${destination} already exists.`)
        }

        fs.outputFileSync(destination, layout)
        console.log(`✔ Successfully created new Layout in ${destination}`)
      } catch (error) {
        throw error
      }
    })

  cli
    .command('make:template <filename>')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Template')
    .action((filename, cmdObj) => {
      if (path.parse(filename).ext === '') {
        throw(`Error: <filename> argument must have an extension, i.e. ${filename}.html`)
      }

      try {
        const template = fs.readFileSync(`${__dirname}/stubs/template.njk`, 'utf-8')
        const destination = cmdObj.directory ? path.resolve(`${cmdObj.directory}/${filename}`) : path.resolve(`${process.cwd()}/src/templates/${filename}`)

        if (fs.existsSync(destination)) {
          throw(`Error: ${destination} already exists.`)
        }

        fs.outputFileSync(destination, template)
        console.log(`✔ Successfully created new Template in ${destination}`)
      } catch (error) {
        throw error
      }
    })

  cli
    .command('make:config <env>')
    .option('-f, --full', 'scaffold a full config')
    .description('scaffold a new Config')
    .action((env, cmdObj) => {
      try {
        const config = fs.readFileSync(`${__dirname}/stubs/config/${cmdObj.full ? 'full' : 'base'}.js`, 'utf-8')
        const destination = path.resolve(`${process.cwd()}/config.${env}.js`)

        if (fs.existsSync(destination)) {
          throw(`Error: ${destination} already exists.`)
        }

        const configString = config.replace('build_local', `build_${env}`)
        fs.outputFileSync(destination, configString)
        console.log(`✔ Successfully created new Config in ${destination}`)
      } catch (error) {
        throw error
      }
    })

  cli
    .command('build [env]')
    .description('compile email templates and output them to disk')
    .action(env => {
      try {
        const Maizzle = importCwd('./bootstrap')
        Maizzle.build(env)
      } catch (err) {
        throw err
      }
    })

  cli
    .command('serve')
    .description('start a local development server and watch for file changes')
    .action(() => {
      try {
        const Maizzle = importCwd('./bootstrap')
        Maizzle.serve()
      } catch (err) {
        throw err
      }
    })

  cli
    .option('-v, --version', 'output current framework and CLI versions')
    .on('option:version', () => {
      const pkg = require('../package.json')
      try {
        const maizzle = importCwd('./node_modules/@maizzle/framework/package.json')
        console.log(`Framework v${maizzle.version}\nCLI v${pkg.version}`)
      } catch (error) {
        console.log(`CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`)
      }
      process.exit()
    })

  cli.on('command:*', () => {
    console.error('Invalid command: %s\nSee --help for a list of available commands.', cli.args.join(' '))
    process.exit(1)
  })

  cli.parse(process.argv)

  if (!process.argv.slice(2).length) {
    cli.help()
  }
}
