import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteStoryDefaultComponent } from './autocomplete-story-default.component';

@NgModule({
  declarations: [AutocompleteStoryDefaultComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AutocompleteModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  exports: [AutocompleteStoryDefaultComponent]
})
export class AutocompleteStoryDefaultModule {}
