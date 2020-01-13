import { withKnobs, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AutocompleteModule } from './autocomplete.module';

export default { title: 'Autocomplete', decorators: [withKnobs, withA11y] };

export const Autocomplete = () => ({
  template: `<es-autocomplete>autocomplete</es-autocomplete>`,
  moduleMetadata: {
    imports: [AutocompleteModule, BrowserAnimationsModule]
  }
});
