const {program} = require('commander')
const importCwd = require('import-cwd')
const Project = require('./commands/new')
const Config = require('./commands/make/config')
const Layout = require('./commands/make/layout')
const updateNotifier = require('update-notifier')
const Tailwind = require('./commands/make/tailwind')
const Template = require('./commands/make/template')

const notFoundError = 'Error: Framework not found\n\nMake sure to run this command in your Maizzle project root, with dependencies installed.'

module.exports = () => {
  program
    .command('new [path] [repo]')
    .description('scaffold a new Maizzle project')
    .option('-d, --no-deps', `Don't install NPM dependencies`)
    .action((repo, dir, cmd) => Project.scaffold(repo, dir, cmd))

  program
    .command('make:layout [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Layout')
    .action((filename, cmd) => Layout.scaffold(filename, cmd))

  program
    .command('make:template [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Template')
    .action((filename, cmd) => Template.scaffold(filename, cmd))

  program
    .command('make:config [env]')
    .option('-f, --full', 'scaffold a full config')
    .description('scaffold a new Config')
    .action((env, cmd) => Config.scaffold(env, cmd))

  program
    .command('make:tailwind [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Tailwind CSS config')
    .action((filename, cmd) => Tailwind.scaffold(filename, cmd))

  program
    .command('build [env]')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .description('compile email templates and output them to disk')
    .action(async (env, cmd) => {
      const bin = cmd.bin || './node_modules/@maizzle/framework/src'

      try {
        await importCwd(bin).build(env)
      } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
          console.error(notFoundError)
        }
      }

      try {
        updateNotifier({
          pkg: importCwd('./node_modules/@maizzle/framework/package.json'),
          shouldNotifyInNpmScript: true
        }).notify()
      } catch {}
    })

  program
    .command('serve')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .description('start a local development server and watch for file changes')
    .action(cmd => {
      const bin = cmd.bin || './node_modules/@maizzle/framework/src'

      try {
        importCwd(bin).serve()
      } catch (error) {
        if (error.code === 'MODULE_NOT_FOUND') {
          console.error(notFoundError)
        }
      }
    })

  program
    .storeOptionsAsProperties(false)
    .option('-v, --version', 'output current framework and CLI versions')
    .on('option:version', () => {
      const pkg = require('../package.json')
      try {
        const maizzle = importCwd('./node_modules/@maizzle/framework/package.json')
        console.log(`Framework v${maizzle.version}\nCLI v${pkg.version}`)
      } catch {
        console.log(`CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`)
      }

      process.exit()
    })
    .on('command:*', () => {
      console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '))
      process.exit(1)
    })

  program.parse(process.argv)

  updateNotifier({
    pkg: require('../package.json'),
    shouldNotifyInNpmScript: true
  }).notify()
}
