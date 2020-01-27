import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ES_CHIPS_DEFAULT_OPTIONS } from '../../chips-autocomplete.component';
import { ESChipsAutocompleteModule } from '../../chips-autocomplete.module';
import { ChipsAutocompleteCheckboxComponent } from './chips-autocomplete-story-checkbox.component';

@NgModule({
  declarations: [ChipsAutocompleteCheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESChipsAutocompleteModule],
  exports: [ChipsAutocompleteCheckboxComponent],
  providers: [
    {
      provide: ES_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        debounceTime: 1000,
        freeInput: false,
        unique: false,
        selectable: true,
        removable: true
      }
    }
  ]
})
export class ESChipsAutocompleteCheckboxModule {}
