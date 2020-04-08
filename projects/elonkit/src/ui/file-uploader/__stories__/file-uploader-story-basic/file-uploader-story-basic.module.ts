import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

import { FileUploaderStoryBasicComponent } from './file-uploader-story-basic.component';

import { ESFileUploaderModule } from '../..';

@NgModule({
  declarations: [FileUploaderStoryBasicComponent],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, ESFileUploaderModule],
  exports: [FileUploaderStoryBasicComponent]
})
export class FileUploaderStoryBasicModule {}
