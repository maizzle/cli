<div align="center">
  <p>
    <a href="https://maizzle.com" target="_blank">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/maizzle/cli/HEAD/.github/cli-mark-dark.svg">
        <img alt="Maizzle CLI" src="https://raw.githubusercontent.com/maizzle/cli/HEAD/.github/cli-mark-light.svg" width="300" height="225" style="max-width: 100%;">
      </picture>
    </a>
  </p>
  <p>The CLI tool for Maizzle</p>
  <div>

  [![Version][npm-version-shield]][npm]
  [![Build][github-ci-shield]][github-ci]
  [![Downloads][npm-stats-shield]][npm-stats]
  [![License][license-shield]][license]

  </div>
</div>

## Installation

You may use `maizzle` directly, with `npx`:

```bash
npx maizzle new
```

This will start the interactive setup:

![Maizzle CLI preview](https://github.com/maizzle/cli/raw/master/.github/preview.jpg)

Alternatively, you can install it globally:

```bash
npm install -g maizzle
```

## Usage

### Create a new project

Interactive mode:

```bash
maizzle new
```

Scaffold a project from a GitHub starter repo (user/repo):

```bash
maizzle new maizzle/maizzle
```

Specify a target directory:

```bash
maizzle new maizzle/maizzle my-project
```

Automatically install dependencies:

```bash
maizzle new maizzle/maizzle my-project --install
```

Use a specific package manager:

```bash
maizzle new maizzle/maizzle my-project --install --pm pnpm
```

### Development

Start a local development server:

```bash
maizzle serve
```

### Build

Build emails for production:

```bash
maizzle build
```

### Scaffolding

You may use the `make` command to scaffold new files for your project.

#### Template

Create a new email template:

```bash
maizzle make:template [filepath]
```

#### Layout

Create a new email layout with the base HTML email structure and a default slot:

```bash
maizzle make:layout [filepath]
```

#### Component

Create a new component with a slot and props:

```bash
maizzle make:component [filepath]
```

#### Config

Create a new `maizzle.config.ts` file:

```bash
maizzle make:config [name]
```

## Documentation

Maizzle documentation is available at https://maizzle.com

## License

The Maizzle framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

[npm]: https://www.npmjs.com/package/maizzle
[npm-stats]: https://npm-stat.com/charts.html?package=maizzle
[npm-version-shield]: https://img.shields.io/npm/v/maizzle.svg
[npm-stats-shield]: https://img.shields.io/npm/dt/maizzle.svg?color=4f46e5
[github-ci]: https://github.com/maizzle/cli/actions
[github-ci-shield]: https://github.com/maizzle/cli/actions/workflows/nodejs.yml/badge.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/maizzle.svg?color=0e9f6e
