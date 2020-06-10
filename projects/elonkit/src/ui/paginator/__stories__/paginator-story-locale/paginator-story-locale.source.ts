export const PAGINATOR_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESPaginatorLocale, ESPaginatorLocaleRU } from '@elonsoft/elonkit/ui/paginator';

  @NgModule({
    ...
    providers: [{ provide: ESPaginatorLocale, useClass: ESPaginatorLocaleRU }]
  })
  export class AppModule {}
  `
};
