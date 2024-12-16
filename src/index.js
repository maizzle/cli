import process from 'node:process'
import { Command } from 'commander'
import { fileURLToPath } from 'url'
import { readFile } from 'fs/promises'
import { resolve, dirname } from 'pathe'
import importFrom from 'import-from-esm'
import { main as wizard } from 'create-maizzle'

import makeConfig from './commands/make/config.js'
import makeLayout from './commands/make/layout.js'
import makeTemplate from './commands/make/template.js'
import makeTailwind from './commands/make/tailwind.js'
import makeComponent from './commands/make/component.js'

const program = new Command()

async function getVersions() {
  let __dirname = dirname(fileURLToPath(import.meta.url))

  // Read CLI package.json
  let pkgData = await readFile(resolve(__dirname, '../package.json'), 'utf-8')
  let pkg = JSON.parse(pkgData)

  try {
    // Read framework package.json
    let frameworkPkgPath = resolve(process.cwd(), 'node_modules', '@maizzle/framework/package.json')
    let frameworkPkgData = await readFile(frameworkPkgPath, 'utf-8')
    let frameworkPkg = JSON.parse(frameworkPkgData)
    return `Framework v${frameworkPkg.version}\nCLI v${pkg.version}`
  } catch {
    return `CLI v${pkg.version}\nTo see your Framework version, run this command in the root directory of a Maizzle project.`
  }
}

export default async function() {
  let versionsText = await getVersions()

  program
    .storeOptionsAsProperties(false)
    .showSuggestionAfterError()
    .showHelpAfterError()
    .version(versionsText, '-v, --version', 'Output the current framework and CLI versions')
    .helpOption('-h, --help', 'Output usage information')
    .helpCommand('help [command]', 'Display help for a specific command')

  /**
   * maizzle build
   *
   * Build templates and output to disk
   * @param {String} [environment] - The environment to build for
   */
  program
    .command('build [environment]')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .option('-c, --config [config]', 'path to a maizzle config file')
    .option('-s, --summary', 'output a summary of the build process')
    .allowUnknownOption()
    .description('Build templates and output to disk')
    .action(async (env, options) => {
      let config = options.config
      let summary = options.summary

      if (options.bin) {
        let { build } = await importFrom(options.bin, '@maizzle/framework')

         config ? await build(config) : await build({ build: { summary }, env })
      } else {
        let { build } = await importFrom(process.cwd(), '@maizzle/framework')

         config ? await build(config) : await build({ build: { summary }, env })
      }
    })

  /**
   * maizzle serve
   *
   * Starts a local development server
   * @param {String} [environment] - The environment to build for
   */
  program
    .command('serve [environment]')
    .option('-b, --bin [bin]', 'path to the maizzle executable')
    .option('-c, --config [config]', 'path to a maizzle config file')
    .option('-p, --port [port]', 'port number to run the server on')
    .allowUnknownOption()
    .description('Start a local development server')
    .action(async (env, options) => {
      let config = options.config
      let port = options.port

      if (options.bin) {
        let { serve } = await importFrom(options.bin, '@maizzle/framework')

        config ? await serve(config) : await serve({ server: { port }, env })
      } else {
        let { serve } = await importFrom(process.cwd(), '@maizzle/framework')

        config ? await serve(config) : await serve({ server: { port }, env })
      }
    })

  /**
   * maizzle new
   *
   * Create a new Maizzle project
   */
  program
    .command('new')
    .description('Create a new Maizzle project')
    .action(async () => {
      await wizard()
    })

  /**
   * maizzle make:config
   *
   * Create a new config file
   * @param {String} [environment] - The environment to create a config for
   */
  program
    .command('make:config [environment]')
    .description('Create a new config')
    .option('-f, --full', 'Create a config file with all options listed')
    .action(async (environment, options) => {
      await makeConfig(environment, options.full)
    })

  /**
   * maizzle make:tailwind
   *
   * Create a new Tailwind CSS config
   * @param {String} [filename] - The filename to save the config as
   */
  program
    .command('make:tailwind [filename]')
    .description('Create a new Tailwind CSS config')
    .action(async (filename) => {
      await makeTailwind(filename)
    })

  /**
   * maizzle make:layout
   *
   * Create a new layout
   * @param {String} [filepath] - The path to save the layout to
   */
  program
    .command('make:layout [filepath]')
    .description('Create a new layout')
    .action(async (filepath) => {
      await makeLayout(filepath)
    })

  /**
   * maizzle make:template
   *
   * Create a new template
   * @param {String} [filepath] - The path to save the template to
   */
  program
    .command('make:template [filepath]')
    .description('Create a new template')
    .action(async (filepath) => {
      await makeTemplate(filepath)
    })

  /**
   * maizzle make:component
   *
   * Create a new component
   * @param {String} [filepath] - The path to save the component to
   */
  program
    .command('make:component [filepath]')
    .description('Create a new component')
    .action(async (filepath) => {
      await makeComponent(filepath)
    })

  program.parseAsync(process.argv)
}
