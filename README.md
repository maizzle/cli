# Maizzle CLI

[![Version][npm-version-shield]][npm]
[![Build][travis-ci-shield]][travis-ci]
[![Downloads][npm-stats-shield]][npm]
[![License][license-shield]][license]

Full documentation is available at https://maizzle.com

## Installation

```sh
npm install -g @maizzle/cli
```

## Usage

Create a new project using the interactive prompt:

```sh
maizzle new
```

<img src="https://github.com/maizzle/cli/blob/1.0/preview.gif?raw=true" width="387">

Change current directory:

```sh
cd maizzle
```

Start a local server by running the `serve` command:

```sh
maizzle serve
```

Build for production:

```sh
maizzle build production
```

See the docs for [available commands](https://maizzle.com/docs/commands/).

[npm]: https://www.npmjs.com/package/@maizzle/cli
[npm-version-shield]: https://img.shields.io/npm/v/@maizzle/cli.svg?style=flat-square
[npm-stats-shield]: https://img.shields.io/npm/dt/@maizzle/cli.svg?style=flat-square&color=6875f5
[travis-ci]: https://travis-ci.org/maizzle/cli/
[travis-ci-shield]: https://img.shields.io/travis/maizzle/cli/master.svg?style=flat-square
[license]: ./LICENSE
[license-shield]: https://img.shields.io/npm/l/@maizzle/cli.svg?style=flat-square&color=0e9f6e
