import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TimepickerStoryLocaleComponent } from './timepicker-story-locale.component';

import { ESTimepickerModule, ESTimepickerLocale, ESTimepickerLocaleRU } from '../..';

@NgModule({
  declarations: [TimepickerStoryLocaleComponent],
  imports: [CommonModule, MatNativeDateModule, FormsModule, MatFormFieldModule, ESTimepickerModule],
  exports: [TimepickerStoryLocaleComponent],
  providers: [{ provide: ESTimepickerLocale, useClass: ESTimepickerLocaleRU }]
})
export class TimepickerStoryLocaleModule {}
