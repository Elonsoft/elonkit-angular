import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { MatInputModule } from '@angular/material/input';

import { TextMaskModule } from 'angular2-text-mask';

import { ESTimepickerComponent } from './timepicker.component';

@NgModule({
  declarations: [ESTimepickerComponent],
  imports: [CommonModule, MatInputModule, TextMaskModule],
  exports: [ESTimepickerComponent],
  providers: [DatePipe]
})
export class ESTimepickerModule {}
