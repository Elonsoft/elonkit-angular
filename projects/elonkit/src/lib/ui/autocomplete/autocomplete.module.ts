import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';

import { AutocompleteOptionDirective } from './autocomplete-option.directive';

import { AutocompleteComponent } from './autocomplete.component';

@NgModule({
  declarations: [AutocompleteComponent, AutocompleteOptionDirective],
  imports: [CommonModule, MatAutocompleteModule, MatInputModule, MatProgressSpinnerModule],
  exports: [AutocompleteComponent, AutocompleteOptionDirective, MatSelectModule]
})
export class AutocompleteModule {}
