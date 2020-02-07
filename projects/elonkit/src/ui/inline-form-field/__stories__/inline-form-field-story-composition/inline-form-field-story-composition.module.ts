import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { InlineFormFieldStoryCompositionComponent } from './inline-form-field-story-composition.component';

import { ESInlineFormFieldModule } from '../..';

@NgModule({
  declarations: [InlineFormFieldStoryCompositionComponent],
  imports: [
    CommonModule,
    FormsModule,

    MatDatepickerModule,
    MatNativeDateModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    ESInlineFormFieldModule
  ],
  exports: [InlineFormFieldStoryCompositionComponent]
})
export class InlineFormFieldStoryCompositionModule {}
