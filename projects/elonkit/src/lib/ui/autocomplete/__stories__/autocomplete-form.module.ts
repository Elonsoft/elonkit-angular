import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';

import { AutocompleteFormComponent } from './autocomplete-form.component';

@NgModule({
  declarations: [AutocompleteFormComponent],
  imports: [CommonModule, ReactiveFormsModule, AutocompleteModule, MatFormFieldModule],
  exports: [AutocompleteFormComponent]
})
export class AutocompleteFormModule {}
