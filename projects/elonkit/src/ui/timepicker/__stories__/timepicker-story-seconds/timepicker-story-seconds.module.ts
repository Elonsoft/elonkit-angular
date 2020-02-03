import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TimepickerStorySecondsComponent } from './timepicker-story-seconds.component';

import { ESTimepickerModule } from '../..';

@NgModule({
  declarations: [TimepickerStorySecondsComponent],
  imports: [CommonModule, MatNativeDateModule, FormsModule, MatFormFieldModule, ESTimepickerModule],
  exports: [TimepickerStorySecondsComponent]
})
export class TimepickerStorySecondsModule {}
