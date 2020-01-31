import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';

import { TextMaskModule } from 'angular2-text-mask';

import { ESTimepickerComponent } from './timepicker.component';
import { ESTimepickerLocale, ESTimepickerLocaleEN } from './timepicker.component.locale';

@NgModule({
  declarations: [ESTimepickerComponent],
  imports: [CommonModule, MatInputModule, TextMaskModule],
  exports: [ESTimepickerComponent],
  providers: [DatePipe, { provide: ESTimepickerLocale, useClass: ESTimepickerLocaleEN }]
})
export class ESTimepickerModule {}
