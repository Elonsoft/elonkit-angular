export const BREADCRUMBS_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESBreadcrumbsLocale, ESBreadcrumbsLocaleRU } from '@elonsoft/elonkit/ui/breadcrumbs';

  @NgModule({
    ...
    providers: [{ provide: ESBreadcrumbsLocale, useClass: ESBreadcrumbsLocaleRU }]
  })
  export class AppModule {}
  `
};
