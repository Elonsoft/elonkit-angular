import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InlineFormFieldStoryTypographyComponent } from './inline-form-field-story-typography.component';

import { ESInlineFormFieldModule } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryTypographyComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
  exports: [InlineFormFieldStoryTypographyComponent]
})
export class InlineFormFieldStoryTypographyModule {}
