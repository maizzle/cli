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

> **Note:** This repository contains the code for Maizzle's CLI tool. If you want to build HTML emails using Maizzle, visit the [Starter repository](https://github.com/maizzle/maizzle).

## Installation

```bash
npm install -g @maizzle/cli
```

## Usage

Create a new project using the interactive prompt:

```bash
maizzle new
```

Start a local development server by running the `serve` command in the project directory:

```bash
maizzle serve
```

Build for production:

```bash
maizzle build production
```

Documentation is available at https://maizzle.com

[npm]: https://www.npmjs.com/package/@maizzle/cli
[npm-stats]: https://npm-stat.com/charts.html?package=%40maizzle%2Fcli&from=2019-03-27
[npm-version-shield]: https://img.shields.io/npm/v/@maizzle/cli.svg
[npm-stats-shield]: https://img.shields.io/npm/dt/@maizzle/cli.svg?color=4f46e5
[github-ci]: https://github.com/maizzle/cli/actions
[github-ci-shield]: https://github.com/maizzle/cli/actions/workflows/nodejs.yml/badge.svg
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/@maizzle/cli.svg?color=0e9f6e
