import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESInlineFormFieldComponent } from './inline-form-field.component';

import {
  ESInlineFormFieldLocale,
  ESInlineFormFieldLocaleEN
} from './inline-form-field.component.locale';

@NgModule({
  declarations: [ESInlineFormFieldComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESInlineFormFieldComponent],
  providers: [{ provide: ESInlineFormFieldLocale, useClass: ESInlineFormFieldLocaleEN }]
})
export class ESInlineFormFieldModule {}
