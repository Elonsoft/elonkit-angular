import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ESChipsAutocompleteModule } from '../../chips-autocomplete.module';
import { ChipsAutocompleteCheckboxComponent } from './chips-autocomplete-story-checkbox.component';

@NgModule({
  declarations: [ChipsAutocompleteCheckboxComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESChipsAutocompleteModule],
  exports: [ChipsAutocompleteCheckboxComponent]
})
export class ESChipsAutocompleteCheckboxModule {}
