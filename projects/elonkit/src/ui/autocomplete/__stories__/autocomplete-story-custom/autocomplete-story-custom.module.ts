import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../../autocomplete.module';

import { ES_AUTOCOMPLETE_DEFAULT_OPTIONS } from '../../autocomplete.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteStoryCustomComponent } from './autocomplete-story-custom.component';

@NgModule({
  declarations: [AutocompleteStoryCustomComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [AutocompleteStoryCustomComponent],
  providers: [
    {
      provide: ES_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: {
        debounceTime: 1000,
        freeInput: true
      }
    }
  ]
})
export class AutocompleteStoryCustomModule {}
