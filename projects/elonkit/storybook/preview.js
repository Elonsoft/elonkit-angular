import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters } from '@storybook/angular';
import { light, dark } from './theme';

addParameters({
  // options: {
  //   theme
  // },
  darkMode: {
    dark,
    light,
    current: 'light',
    stylePreview: true
  }
});
