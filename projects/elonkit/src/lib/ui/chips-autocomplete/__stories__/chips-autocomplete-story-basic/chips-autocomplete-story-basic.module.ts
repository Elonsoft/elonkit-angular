import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ES_CHIPS_DEFAULT_OPTIONS } from '../../chips-autocomplete.component';
import { ESChipsAutocompleteModule } from '../../chips-autocomplete.module';
import { ChipsAutocompleteBasicComponent } from './chips-autocomplete-story-basic.component';

@NgModule({
  declarations: [ChipsAutocompleteBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESChipsAutocompleteModule],
  exports: [ChipsAutocompleteBasicComponent],
  providers: [
    {
      provide: ES_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        debounceTime: 1000,
        freeInput: true
      }
    }
  ]
})
export class ESChipsAutocompleteBasicModule {}
