const {program} = require('commander')
const importCwd = require('import-cwd')
const resolveCwd = require('resolve-cwd')
const updateNotifier = require('update-notifier')

const Project = require('./commands/new.js')
const Config = require('./commands/make/config.js')
const Layout = require('./commands/make/layout.js')
const Tailwind = require('./commands/make/tailwind.js')
const Template = require('./commands/make/template.js')

module.exports = () => {
  program
    .command('new [repository] [path]')
    .description('scaffold a new Maizzle project')
    .option('-d, --no-deps', `Don't install NPM dependencies`)
    .action((repository, path, options, command) => Project.scaffold(repository, path, options, command))

  program
    .command('make:layout [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Layout')
    .action((filename, options, command) => Layout.scaffold(filename, options, command))

  program
    .command('make:template [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Template')
    .action((filename, options, command) => Template.scaffold(filename, options, command))

  program
    .command('make:config [env]')
    .option('-f, --full', 'scaffold a full config')
    .description('scaffold a new Config')
    .action((env, options, command) => Config.scaffold(env, options, command))

  program
    .command('make:tailwind [filename]')
    .option('-d, --directory <dir>', 'directory where the file should be output')
    .description('scaffold a new Tailwind CSS config')
    .action((filename, options, command) => Tailwind.scaffold(filename, options, command))

  program
    .command('build [env]')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .description('compile email templates and output them to disk')
    .action(async (env, options) => {
      const bin = options.bin || resolveCwd('@maizzle/framework')

      await importCwd(bin).build(env)

      try {
        updateNotifier({
          pkg: importCwd(resolveCwd('@maizzle/framework/package.json')),
          shouldNotifyInNpmScript: true,
        }).notify()
      } catch {}
    })

  program
    .command('serve [env]')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .option('-nc, --noclear [noclear]', 'do not clear the console log')
    .description('start a local development server and watch for file changes')
    .action((env, options) => {
      const bin = options.bin || resolveCwd('@maizzle/framework')

      importCwd(bin).serve(env, {
        build: {
          console: {
            clear: !options.noclear,
          },
        },
      })
    })

  program
    .storeOptionsAsProperties(false)
    .showSuggestionAfterError()
    .showHelpAfterError()
    .option('-v, --version', 'output current framework and CLI versions')
    .on('option:version', () => {
      const pkg = require('../package.json')

      try {
        console.log(`Framework v${importCwd(resolveCwd('@maizzle/framework/package.json')).version}\nCLI v${pkg.version}`)
      } catch {
        console.log(`CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`)
      }

      process.exit()
    })

  program.parse(process.argv)

  updateNotifier({
    pkg: require('../package.json'),
    shouldNotifyInNpmScript: true,
  }).notify()
}
