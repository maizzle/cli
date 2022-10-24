<div align="center">
  <p>
    <a href="https://maizzle.com" target="_blank">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/maizzle/cli/master/.github/cli-mark-dark.svg">
        <img alt="Maizzle CLI" src="https://raw.githubusercontent.com/maizzle/cli/master/.github/cli-mark-light.svg" width="300" height="225" style="max-width: 100%;">
      </picture>
    </a>
  </p>
<div>

  [![Version][npm-version-shield]][npm]
  [![Build][github-ci-shield]][github-ci]
  [![Downloads][npm-stats-shield]][npm-stats]
  [![License][license-shield]][license]

  </div>
</div>


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
[npm-version-shield]: https://img.shields.io/npm/v/@maizzle/cli.svg?style=flat-square
[npm-stats-shield]: https://img.shields.io/npm/dt/@maizzle/cli.svg?style=flat-square&color=6875f5
[github-ci]: https://github.com/maizzle/cli/actions
[github-ci-shield]: https://img.shields.io/github/workflow/status/maizzle/cli/Node.js%20CI?style=flat-square
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/@maizzle/cli.svg?style=flat-square&color=0e9f6e
