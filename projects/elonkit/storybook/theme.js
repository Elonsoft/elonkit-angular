import { create } from '@storybook/theming/create';

import logoLight from './assets/logo-light.svg'
import logoDark from './assets/logo-dark.svg'

export const light = create({
  base: 'light',

  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Elonsoft',
  brandImage: logoLight,
  brandUrl: 'https://elonsoft.ru/'
});

export const dark = create({
  base: 'dark',
  appContentBg: '#18181A',

  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Elonsoft',
  brandImage: logoDark,
  brandUrl: 'https://elonsoft.ru/'
});
