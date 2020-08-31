export const FILE_LIST_STORY_LOCALE_SOURCE = {
  ts: `
  import { LOCALE_ID, NgModule } from '@angular/core';
  import { CommonModule, registerLocaleData } from '@angular/common';
  import localeRu from '@angular/common/locales/ru';
  import { ESFileListLocale, ESFileListLocaleRU } from '@elonsoft/elonkit/ui/file-list';
  registerLocaleData(localeRu, 'ru');

  @NgModule({
    ...
    providers: [
      { provide: ESFileListLocale, useClass: ESFileListLocaleRU },
      { provide: LOCALE_ID, useValue: 'ru' }
    ]
  })
  export class AppModule {}
  `
};
