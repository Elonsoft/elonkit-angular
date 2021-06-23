import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { CoreModule } from '~storybook/core.module';

import { ESAutocompleteMultipleModule } from '../..';

import { AutocompleteMultipleStoryServiceComponent } from './autocomplete-multiple-story-service.component';
import { AutocompleteMultipleStoryService } from './autocomplete-multiple-story-service.service';

@NgModule({
  declarations: [AutocompleteMultipleStoryServiceComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    CoreModule,
    ESAutocompleteMultipleModule
  ],
  exports: [AutocompleteMultipleStoryServiceComponent],
  providers: [AutocompleteMultipleStoryService]
})
export class AutocompleteMultipleStoryServiceModule {}
