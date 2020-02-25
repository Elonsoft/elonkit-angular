import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AutocompleteModule } from '../../autocomplete.module';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AutocompleteStoryNgModelComponent } from './autocomplete-story-ng-model.component';

@NgModule({
  declarations: [AutocompleteStoryNgModelComponent],
  imports: [CommonModule, FormsModule, AutocompleteModule, MatFormFieldModule, MatButtonModule],
  exports: [AutocompleteStoryNgModelComponent]
})
export class AutocompleteStoryNgModelModule {}
