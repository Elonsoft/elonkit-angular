import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TimepickerStoryBasicComponent } from './timepicker-story-basic.component';

import { ESTimepickerModule } from '../..';

@NgModule({
  declarations: [TimepickerStoryBasicComponent],
  imports: [CommonModule, MatNativeDateModule, FormsModule, MatFormFieldModule, ESTimepickerModule],
  exports: [TimepickerStoryBasicComponent]
})
export class TimepickerStoryBasicModule {}
