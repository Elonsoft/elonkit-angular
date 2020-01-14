import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteFormComponent } from './autocomplete-form.component';

@NgModule({
  declarations: [AutocompleteFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [AutocompleteFormComponent]
})
export class AutocompleteFormModule {}
