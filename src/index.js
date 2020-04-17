const cli = require('commander')
const importCwd = require('import-cwd')
const Project = require('./commands/new')
const Config = require('./commands/make/config')
const Layout = require('./commands/make/layout')
const Template = require('./commands/make/template')

module.exports = () => {
  cli
    .command('new [path] [repo]')
    .description('scaffold a new Maizzle project')
    .option('-d, --no-deps', `Don't install NPM dependencies`)
    .action((repo, dir, cmdObj) => Project.scaffold(repo, dir, cmdObj))

  cli
    .command('make:layout <filename>')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Layout')
    .action((filename, cmdObj) => Layout.scaffold(filename, cmdObj))

  cli
    .command('make:template <filename>')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Template')
    .action((filename, cmdObj) => Template.scaffold(filename, cmdObj))

  cli
    .command('make:config <env>')
    .option('-f, --full', 'scaffold a full config')
    .description('scaffold a new Config')
    .action((env, cmdObj) => Config.scaffold(env, cmdObj))

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
