import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InlineFormFieldStoryValidationComponent } from './inline-form-field-story-validation.component';

import { ESInlineFormFieldModule } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryValidationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ESInlineFormFieldModule
  ],
  exports: [InlineFormFieldStoryValidationComponent]
})
export class InlineFormFieldStoryValidationModule {}
