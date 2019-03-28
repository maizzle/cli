const cli = require('commander')
const pkg = require('../package.json')
const importCwd = require('import-cwd')
const Project = require('./commands/new')

module.exports = () => {
  cli.version(pkg.version, '-v, --version')

  cli
    .command('new [path] [repo]')
    .description('scaffold a new Maizzle project')
    .action((path, repo) => Project.scaffold(path, repo) )

  cli
    .command('build [env]')
    .description(`compile email templates and output them to disk`)
    .action((env) => {
      try {
        const Maizzle = importCwd('./bootstrap')
        Maizzle.build(env)
      } catch (err) {
        throw err
      }
    })

  cli
    .command('serve')
    .description(`start a local development server and watch for file changes`)
    .action(() => {
      try {
        const Maizzle = importCwd('./bootstrap')
        Maizzle.serve()
      } catch (err) {
        throw err
      }
    })

  cli.parse(process.argv)

  if (!cli.args.length) cli.help()
}
