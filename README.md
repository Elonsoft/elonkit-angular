# Elonkit

[![npm package](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://elonkit.elonsoft.ru)
[![npm package](https://img.shields.io/npm/v/@elonsoft/elonkit)](https://www.npmjs.com/package/@elonsoft/elonkit)
[![npm downloads](https://img.shields.io/npm/dm/@elonsoft/elonkit)](https://www.npmjs.com/package/@elonsoft/elonkit)
[![Average time to resolve an issue](https://isitmaintained.com/badge/resolution/elonsoft/elonkit.svg)](https://isitmaintained.com/project/elonsoft/elonkit 'Average time to resolve an issue')

## Installation

```bash
yarn add @elonsoft/elonkit angular2-text-mask text-mask-addons
```

## Usage

In your global styles import components theme and include it with Angular Material theme as an argument.

```scss
@import '@elonsoft/elonkit/theme';
@include es-theme($theme);
```

Add library assets to your `angular.json` config:

```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  {
    "glob": "**/*",
    "input": "./node_modules/@elonsoft/elonkit/assets",
    "output": "./assets"
  }
],
```

For a full list of componets and usage examples check out our [documentation website](https://elonkit.elonsoft.ru/).

## Contributing

Read our [contributing guide](/CONTRIBUTING) to learn about our development process and how to propose bugfixes and improvements.

## License

This project is licensed under the terms of the [MIT license](/LICENSE).
