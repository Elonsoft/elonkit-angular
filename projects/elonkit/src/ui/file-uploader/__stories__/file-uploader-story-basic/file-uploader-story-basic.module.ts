import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileUploaderStoryBasicComponent } from './file-uploader-story-basic.component';

import { ESFileUploaderModule } from '../..';

@NgModule({
  declarations: [FileUploaderStoryBasicComponent],
  imports: [CommonModule, FormsModule, ESFileUploaderModule],
  exports: [FileUploaderStoryBasicComponent]
})
export class FileUploaderStoryBasicModule {}
