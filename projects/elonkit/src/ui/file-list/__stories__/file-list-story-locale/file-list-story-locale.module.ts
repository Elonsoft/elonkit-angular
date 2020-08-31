import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { FileListStoryLocaleComponent } from './file-list-story-locale.component';
import { ESFileListModule } from '../../file-list.module';
import { ESFileListLocale, ESFileListLocaleRU } from '../../file-list.component.locale';

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [FileListStoryLocaleComponent],
  imports: [CommonModule, ESFileListModule],
  exports: [FileListStoryLocaleComponent],
  providers: [
    { provide: ESFileListLocale, useClass: ESFileListLocaleRU },
    { provide: LOCALE_ID, useValue: 'ru' }
  ]
})
export class FileListStoryLocaleModule {}
