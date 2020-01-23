import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ESChipsAutocompleteModule } from '../../chips-autocomplete.module';
import { ChipsAutocompleteCustomComponent } from './chips-autocomplete-story-custom.component';

@NgModule({
  declarations: [ChipsAutocompleteCustomComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESChipsAutocompleteModule],
  exports: [ChipsAutocompleteCustomComponent]
})
export class ESChipsAutocompleteCustomModule {}
