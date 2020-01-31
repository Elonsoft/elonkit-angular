import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ES_CHIPS_DEFAULT_OPTIONS } from '../../chips-autocomplete.component';
import { ESChipsAutocompleteModule } from '../../chips-autocomplete.module';
import { ChipsAutocompleteCustomComponent } from './chips-autocomplete-story-custom.component';

@NgModule({
  declarations: [ChipsAutocompleteCustomComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESChipsAutocompleteModule],
  exports: [ChipsAutocompleteCustomComponent],
  providers: [
    {
      provide: ES_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        debounceTime: 1000,
        freeInput: false,
        unique: true,
        selectable: true,
        removable: true
      }
    }
  ]
})
export class ESChipsAutocompleteCustomModule {}
