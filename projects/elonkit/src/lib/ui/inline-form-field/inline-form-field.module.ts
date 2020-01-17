import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InlineFormFieldComponent } from './inline-form-field.component';

import {
  InlineFormFieldLocale,
  InlineFormFieldLocaleEN
} from './inline-form-field.component.locale';

@NgModule({
  declarations: [InlineFormFieldComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [InlineFormFieldComponent],
  providers: [{ provide: InlineFormFieldLocale, useValue: InlineFormFieldLocaleEN }]
})
export class ESInlineFormFieldModule {}
