import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { TimepickerStoryRequiredComponent } from './timepicker-story-required.component';

import { ESTimepickerModule } from '../..';

@NgModule({
  declarations: [TimepickerStoryRequiredComponent],
  imports: [CommonModule, MatNativeDateModule, FormsModule, MatFormFieldModule, ESTimepickerModule],
  exports: [TimepickerStoryRequiredComponent]
})
export class TimepickerStoryRequiredModule {}
