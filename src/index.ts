import { Command } from 'commander'
import newProject from './commands/new.ts'
import makeConfig from './commands/make/config.ts'
import makeLayout from './commands/make/layout.ts'
import makeTemplate from './commands/make/template.ts'
import makeComponent from './commands/make/component.ts'

interface Framework {
  serve: (options?: any) => Promise<any>
  build: (options?: any) => Promise<any>
  prepare: (options?: any) => Promise<any>
}

export default async function bootstrap(framework?: Framework) {
  const program = new Command()

  program
    .name('maizzle')
    .description('Maizzle CLI')
    .version('1.2.0')

  if (framework) {
    program
      .command('serve')
      .alias('dev')
      .description('Start the Maizzle dev server with HMR')
      .option('-c, --config <path>', 'Path to a Maizzle config file')
      .option('-p, --port <number>', 'Dev server port')
      .option('--host [address]', 'Expose on network')
      .action(async (options) => {
        await framework.serve({
          config: options.config,
          port: options.port ? parseInt(options.port, 10) : undefined,
          host: options.host,
        })
      })

    program
      .command('build')
      .description('Build email templates to HTML')
      .option('-c, --config <path>', 'Path to a Maizzle config file')
      .option('-o, --output <path>', 'Output directory')
      .option('--pretty', 'Pretty-print HTML output (ignored when -c is set)')
      .option('--plaintext', 'Generate plaintext versions (ignored when -c is set)')
      .action(async (options) => {
        if (options.config) {
          await framework.build(options.config)
          return
        }

        const overrides: Record<string, any> = {}
        if (options.output) overrides.output = { path: options.output }
        if (options.pretty) overrides.html = { format: true }
        if (options.plaintext) overrides.plaintext = true

        await framework.build(Object.keys(overrides).length ? overrides : undefined)
      })

    program
      .command('prepare')
      .description('Generate IDE type definitions in .maizzle/')
      .option('-c, --config <path>', 'Path to a Maizzle config file')
      .action(async (options) => {
        await framework.prepare({
          config: options.config,
        })
      })
  }

  program
    .command('new [starter] [directory]')
    .description('Create a new Maizzle project')
    .option('-i, --install', 'Install dependencies')
    .option('--pm <manager>', 'Package manager to use')
    .action(async (starter, directory, options) => {
      await newProject(starter, directory, options)
    })

  program
    .command('make:config [name]')
    .description('Create a new config file')
    .action(async (name) => {
      await makeConfig(name)
    })

  program
    .command('make:layout [filepath]')
    .description('Create a new layout')
    .action(async (filepath) => {
      await makeLayout(filepath)
    })

  program
    .command('make:template [filepath]')
    .description('Create a new template')
    .action(async (filepath) => {
      await makeTemplate(filepath)
    })

  program
    .command('make:component [filepath]')
    .description('Create a new component')
    .action(async (filepath) => {
      await makeComponent(filepath)
    })

  await program.parseAsync(process.argv)
}
