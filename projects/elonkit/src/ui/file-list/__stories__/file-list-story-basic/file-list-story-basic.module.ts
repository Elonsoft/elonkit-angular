import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileListStoryBasicComponent } from './file-list-story-basic.component';
import { ESFileListModule } from '../../file-list.module';

@NgModule({
  declarations: [FileListStoryBasicComponent],
  imports: [CommonModule, ESFileListModule],
  exports: [FileListStoryBasicComponent]
})
export class FileListStoryBasicModule {}
