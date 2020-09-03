import '!style-loader!css-loader!sass-loader!./preview-theme.scss';

import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
setCompodocJson(docJson);

import { addParameters, addDecorator, moduleMetadata } from '@storybook/angular';
import theme from './theme';

import { LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

registerLocaleData(localeRu, 'ru');

import { ESLocaleService, ru } from '../src/ui/locale';

const localeService = new ESLocaleService();
localeService.register('ru', ru);

addParameters({
  controls: { hideNoControlsWarning: true },
  docs: {
    theme
  }
});

addDecorator((story, context) => {
  const locale = context.globals.locale;

  if (locale !== localeService.currentLanguage()) {
    localeService.use(locale);
  }

  return moduleMetadata({
    imports: [BrowserAnimationsModule],
    providers: [
      { provide: LOCALE_ID, useValue: locale },
      { provide: ESLocaleService, useValue: localeService }
    ]
  })(story, context);
});

const isRussian = window.navigator.language === 'ru-RU';

export const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Set the LOCALE_ID of the components',
    defaultValue: isRussian ? 'ru' : 'en',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', title: 'English' },
        { value: 'ru', title: 'Русский' }
      ]
    }
  }
};
