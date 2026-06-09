import { downloadTemplate } from 'giget'
import color from 'picocolors'
import * as p from '@clack/prompts'
import { rm } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { installDependencies } from 'nypm'

function renderHeader() {
  const lines = [
    ' ███╗   ███╗  █████╗  ██╗ ███████╗ ███████╗ ██╗      ███████╗',
    ' ████╗ ████║ ██╔══██╗ ██║ ╚══███╔╝ ╚══███╔╝ ██║      ██╔════╝',
    ' ██╔████╔██║ ███████║ ██║   ███╔╝    ███╔╝  ██║      █████╗  ',
    ' ██║╚██╔╝██║ ██╔══██║ ██║  ███╔╝    ███╔╝   ██║      ██╔══╝  ',
    ' ██║ ╚═╝ ██║ ██║  ██║ ██║ ███████╗ ███████╗ ███████╗ ███████╗',
    ' ╚═╝     ╚═╝ ╚═╝  ╚═╝ ╚═╝ ╚══════╝ ╚══════╝ ╚══════╝ ╚══════╝',
  ]

  const gradients: Record<string, number[]> = {
    Aurora: [51, 50, 49, 48, 47, 41],
    Cyberpunk: [201, 165, 129, 93, 57, 21],
    Ember: [227, 221, 215, 209, 203, 197],
    Rose: [213, 212, 211, 210, 209, 203],
    Lavender: [183, 177, 171, 135, 99, 63],
    Mint: [122, 121, 120, 119, 85, 84],
    Ocean: [51, 45, 39, 33, 27, 26],
    Sunset: [214, 208, 202, 196, 160, 124],
  }

  const names = Object.keys(gradients)
  const gradient = gradients[names[Math.floor(Math.random() * names.length)]]

  console.log('')
  for (let i = 0; i < lines.length; i++) {
    const c = gradient[i]
    console.log(`\x1b[38;5;${c}m${lines[i]}\x1b[0m`)
  }
}

interface Project {
  starter: string
  path: string
  install: boolean
  pm: string
}

export default async function newProject(starterArg?: string, dirArg?: string, options: { install?: boolean, pm?: string } = {}) {
  let project: Project

  if (starterArg) {
    const dirInput = dirArg || `./${starterArg.split('/').pop()!.replace('.git', '')}`

    if (existsSync(dirInput)) {
      console.error(`Error: directory ${dirInput} already exists.`)
      process.exit(1)
    }

    project = {
      starter: starterArg,
      path: dirInput,
      install: options.install ?? false,
      pm: options.pm || 'npm',
    }
  } else {
    console.clear()

    renderHeader()

    console.log(`\n${color.dim('Quickly build HTML emails with Tailwind CSS.')}\n`)
    console.log(`Docs:    https://maizzle.com \nGitHub:  https://github.com/maizzle\n`)

    p.intro(`${color.bgBlack(color.white(' maizzle new '))}`)

    project = await p.group(
      {
        path: () =>
          p.text({
            message: 'Where should we create your project?',
            placeholder: './maizzle',
            initialValue: './maizzle',
            validate: value => {
              if (!value) return 'Please enter a path.'
              if (existsSync(value)) return 'That directory already exists. Please enter a different path.'
            },
          }),
        starter: async () => {
          const starter = await p.select({
            message: 'Select a Starter',
            initialValue: 'maizzle/maizzle#master',
            options: [
              { value: 'maizzle/maizzle#master', label: 'Default' },
              { value: 'custom', label: 'Custom' },
            ],
          })

          if (starter === 'custom') {
            return p.text({
              message: 'Enter a GitHub `user/repo` path or a full Git repository URL.',
              validate: value => {
                if (!value) return 'Please enter a value.'
              },
            })
          }

          return starter
        },
        install: () =>
          p.confirm({
            message: 'Install dependencies?',
            initialValue: true,
          }),
        pm: async () => options.pm || 'npm',
      },
      {
        onCancel: () => {
          p.cancel('💀')
          process.exit(0)
        },
      }
    ) as unknown as Project
  }

  if (project.install) {
    try {
      execSync(`${project.pm} --version`, { stdio: 'ignore' })
    } catch {
      p.log.error(`${project.pm} is not installed. Please install it first.`)
      process.exit(1)
    }
  }

  await p.tasks([
    {
      title: 'Creating project',
      task: async () => {
        await downloadTemplate(project.starter.includes(':') ? project.starter : `gh:${project.starter}`, {
          dir: project.path,
        })
        await rm(`${project.path}/.github`, { recursive: true, force: true })
        return `Created project in ${project.path}`
      },
    },
    {
      title: 'Installing dependencies',
      enabled: project.install,
      task: async () => {
        const startTime = Date.now()
        await installDependencies({
          cwd: project.path,
          silent: true,
          packageManager: project.pm as any,
        })
        return `Installed dependencies ${color.gray((Date.now() - startTime) / 1000 + 's')}`
      },
    },
  ])

  const pm = project.pm || 'npm'
  const runCmd = pm === 'yarn' ? 'yarn dev' : `${pm} run dev`

  const nextSteps = `cd ${project.path}        \n\n${project.install ? '' : `${pm} install\n\n`}${runCmd}`

  p.note(nextSteps, 'Next steps:')

  p.outro(`Documentation: https://maizzle.com/docs \n\n   Components: https://mailviews.com`)

  process.exit(0)
}
