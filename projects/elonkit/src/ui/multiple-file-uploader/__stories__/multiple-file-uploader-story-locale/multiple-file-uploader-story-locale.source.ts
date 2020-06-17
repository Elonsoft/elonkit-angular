export const MULTIPLE_FILE_UPLOADER_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESFileListLocale, ESFileListLocaleRU } from '@elonsoft/elonkit/ui/multiple-file-uploader/file-list';

  @NgModule({
    ...
    providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }]
  })
  export class AppModule {}
  `
};
