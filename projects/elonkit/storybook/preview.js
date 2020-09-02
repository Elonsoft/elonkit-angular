import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters, addDecorator, moduleMetadata } from '@storybook/angular';
import theme from './theme';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

addParameters({
  docs: {
    theme
  }
});

addDecorator(
  moduleMetadata({
    imports: [BrowserAnimationsModule]
  })
);
