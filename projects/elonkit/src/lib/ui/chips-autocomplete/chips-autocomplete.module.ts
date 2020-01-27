import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { ChipsAutocompleteOptionDirective } from './chips-autocomplete.directive';
import { ChipDirective } from './chip.directive';

import { ChipsAutocompleteComponent } from './chips-autocomplete.component';

@NgModule({
  declarations: [ChipsAutocompleteComponent, ChipsAutocompleteOptionDirective, ChipDirective],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule
  ],
  exports: [
    ChipsAutocompleteComponent,
    ChipsAutocompleteOptionDirective,
    ChipDirective,
    MatSelectModule
  ]
})
export class ESChipsAutocompleteModule {}
