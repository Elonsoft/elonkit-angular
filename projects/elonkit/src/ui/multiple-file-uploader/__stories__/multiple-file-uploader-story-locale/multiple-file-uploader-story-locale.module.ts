import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ESMultipleFileUploaderModule } from '../..';
import { ESFileListLocale, ESFileListLocaleRU } from '../../file-list';
import { MultipleFileUploaderStoryLocaleComponent } from './multiple-file-uploader-story-locale.component';

@NgModule({
  declarations: [MultipleFileUploaderStoryLocaleComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    ESMultipleFileUploaderModule
  ],
  exports: [MultipleFileUploaderStoryLocaleComponent],
  providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }]
})
export class MultipleFileUploaderStoryLocaleModule {}
