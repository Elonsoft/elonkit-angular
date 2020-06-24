import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FileListStoryLocaleComponent } from './file-list-story-locale.component';
import { ESFileListModule } from '../../file-list.module';
import { ESFileListLocale, ESFileListLocaleRU } from '../../file-list.component.locale';

@NgModule({
  declarations: [FileListStoryLocaleComponent],
  imports: [CommonModule, HttpClientModule, ESFileListModule],
  exports: [FileListStoryLocaleComponent],
  providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }]
})
export class FileListStoryLocaleModule {}
