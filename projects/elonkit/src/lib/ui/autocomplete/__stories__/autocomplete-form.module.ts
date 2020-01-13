import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { AutocompleteFormComponent } from './autocomplete-form.component';

@NgModule({
  declarations: [AutocompleteFormComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    AutocompleteModule,
    MatFormFieldModule
  ],
  exports: [AutocompleteFormComponent]
})
export class AutocompleteFormModule {}
