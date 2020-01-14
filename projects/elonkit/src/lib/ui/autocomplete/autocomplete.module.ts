import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule],
  exports: [AutocompleteComponent]
})
export class AutocompleteModule {}
