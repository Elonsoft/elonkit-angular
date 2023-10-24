import { dirname, join } from "path";
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx'],

  addons: [
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-controls"),
    getAbsolutePath("@storybook/addon-actions"),
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-viewport"),
    getAbsolutePath("@storybook/addon-toolbars"),
    getAbsolutePath("storybook-dark-mode"),
    getAbsolutePath("@storybook/addon-mdx-gfm")
  ],

  framework: {
    name: getAbsolutePath("@storybook/angular"),
    options: {}
  },

  docs: {
    autodocs: true
  },
  staticDirs: ["./assets"]
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
