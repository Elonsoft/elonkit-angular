import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';

import { ESAutocompleteMultipleComponent } from './autocomplete-multiple.component';
import { ESTooltipModule } from '../tooltip';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    A11yModule,
    OverlayModule,
    ESTooltipModule
  ],
  exports: [ESAutocompleteMultipleComponent],
  declarations: [ESAutocompleteMultipleComponent]
})
export class ESAutocompleteMultipleModule {}
