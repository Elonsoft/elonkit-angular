import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CoreModule } from '~storybook/core.module';

import { ESAutocompleteMultipleModule } from '../..';

import { AutocompleteMultipleStoryBasicComponent } from './autocomplete-multiple-story-basic.component';

@NgModule({
  declarations: [AutocompleteMultipleStoryBasicComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CoreModule,
    ESAutocompleteMultipleModule
  ],
  exports: [AutocompleteMultipleStoryBasicComponent]
})
export class AutocompleteMultipleStoryBasicModule {}
