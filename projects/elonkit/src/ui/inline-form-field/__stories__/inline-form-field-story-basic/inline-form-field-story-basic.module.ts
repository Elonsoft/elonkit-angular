import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InlineFormFieldStoryBasicComponent } from './inline-form-field-story-basic.component';

import { ESInlineFormFieldModule } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryBasicComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
  exports: [InlineFormFieldStoryBasicComponent]
})
export class InlineFormFieldStoryBasicModule {}
