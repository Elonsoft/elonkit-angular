import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileListStoryTypographyComponent } from './file-list-story-typography.component';
import { ESFileListModule } from '../../file-list.module';

@NgModule({
  declarations: [FileListStoryTypographyComponent],
  imports: [CommonModule, ESFileListModule],
  exports: [FileListStoryTypographyComponent]
})
export class FileListStoryTypographyModule {}
