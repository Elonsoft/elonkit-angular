import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters } from '@storybook/angular';
import theme from './theme';

addParameters({
  options: {
    theme
  }
});
