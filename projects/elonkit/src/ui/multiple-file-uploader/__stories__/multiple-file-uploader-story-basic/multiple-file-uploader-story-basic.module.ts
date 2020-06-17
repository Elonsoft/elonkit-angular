import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MultipleFileUploaderStoryBasicComponent } from './multiple-file-uploader-story-basic.component';

import { ESMultipleFileUploaderModule } from '../..';

@NgModule({
  declarations: [MultipleFileUploaderStoryBasicComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    ESMultipleFileUploaderModule
  ],
  exports: [MultipleFileUploaderStoryBasicComponent]
})
export class MultipleFileUploaderStoryBasicModule {}
