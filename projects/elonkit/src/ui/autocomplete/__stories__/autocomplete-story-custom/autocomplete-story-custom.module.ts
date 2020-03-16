import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AutocompleteModule } from '../../autocomplete.module';

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
  exports: [AutocompleteStoryCustomComponent]
})
export class AutocompleteStoryCustomModule {}
