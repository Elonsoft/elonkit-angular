import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters } from '@storybook/angular';
import theme from './theme';

addParameters({
  options: {
    theme,
    storySort: (a, b) => {
      if (a[1].kind.split('/')[0] !== b[1].kind.split('/')[0]) {
        return a[1].kind.startsWith('UI') ? -1 : 1;
      }

      return a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true });
    }
  }
});
