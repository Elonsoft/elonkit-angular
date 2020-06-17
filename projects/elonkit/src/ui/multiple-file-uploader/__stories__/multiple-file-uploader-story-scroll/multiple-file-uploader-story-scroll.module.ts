import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ESMultipleFileUploaderModule } from '../..';
import { MultipleFileUploaderStoryScrollComponent } from './multiple-file-uploader-story-scroll.component';

@NgModule({
  declarations: [MultipleFileUploaderStoryScrollComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    ESMultipleFileUploaderModule
  ],
  exports: [MultipleFileUploaderStoryScrollComponent]
})
export class MultipleFileUploaderStoryScrollModule {}
