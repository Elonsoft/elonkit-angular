import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { InlineFormFieldStoryCancelComponent } from './inline-form-field-story-cancel.component';

import { ESInlineFormFieldModule } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryCancelComponent],
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
  exports: [InlineFormFieldStoryCancelComponent]
})
export class InlineFormFieldStoryCancelModule {}
