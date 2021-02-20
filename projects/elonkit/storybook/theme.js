import { create } from '@storybook/theming/create';

export const light = create({
  base: 'light',

  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Elonsoft',
  brandUrl: 'https://elonsoft.ru/'
});

export const dark = create({
  base: 'dark',
  appContentBg: '#18181A',

  fontBase: '"Roboto", sans-serif',
  fontCode: 'monospace',

  brandTitle: 'Elonsoft',
  brandUrl: 'https://elonsoft.ru/'
});
