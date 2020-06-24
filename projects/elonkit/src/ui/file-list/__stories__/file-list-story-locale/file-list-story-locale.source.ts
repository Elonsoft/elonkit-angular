export const FILE_LIST_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESFileListLocale, ESFileListLocaleRU } from '@elonsoft/elonkit/ui/file-list';

  @NgModule({
    ...
    providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }]
  })
  export class AppModule {}
  `
};
