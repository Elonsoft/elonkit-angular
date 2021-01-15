import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileListStoryCustomIconComponent } from './file-list-story-custom-icon.component';
import { ESFileListModule } from '../../file-list.module';

@NgModule({
  declarations: [FileListStoryCustomIconComponent],
  imports: [CommonModule, ESFileListModule],
  exports: [FileListStoryCustomIconComponent]
})
export class FileListStoryCustomIconModule {}
