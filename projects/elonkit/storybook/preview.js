import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters, addDecorator, moduleMetadata } from '@storybook/angular';
import theme from './theme';

import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ESAlertLocale, ESAlertLocaleRU } from '../src/ui/alert/alert.component.locale';
import {
  ESPaginatorLocale,
  ESPaginatorLocaleRU
} from '../src/ui/paginator/paginator.component.locale';

addParameters({
  docs: {
    theme
  }
});

addDecorator((story, context) => {
  const locale = context.globals.locale;

  return moduleMetadata({
    imports: [BrowserAnimationsModule],
    providers: [
      {
        provide: LOCALE_ID,
        useValue: locale
      },
      {
        provide: ESAlertLocale,
        useClass: locale === 'en' ? ESAlertLocale : ESAlertLocaleRU
      },
      {
        provide: ESPaginatorLocale,
        useClass: locale === 'en' ? ESPaginatorLocale : ESPaginatorLocaleRU
      }
    ]
  })(story, context);
});

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the LOCALE_ID of the components',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Русский' }
      ]
    }
  }
};
