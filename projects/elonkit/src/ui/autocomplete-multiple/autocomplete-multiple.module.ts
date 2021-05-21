import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';

import { ESAutocompleteMultipleComponent } from './autocomplete-multiple.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    A11yModule,
    OverlayModule
  ],
  exports: [ESAutocompleteMultipleComponent],
  declarations: [ESAutocompleteMultipleComponent]
})
export class ESAutocompleteMultipleModule {}
