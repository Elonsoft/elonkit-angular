import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FileListStoryBasicComponent } from './file-list-story-basic.component';
import { ESFileListModule } from '../../file-list.module';

@NgModule({
  declarations: [FileListStoryBasicComponent],
  imports: [CommonModule, HttpClientModule, ESFileListModule],
  exports: [FileListStoryBasicComponent]
})
export class FileListStoryBasicModule {}
