export const ALERT_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESAlertLocale, ESAlertLocaleRU } from '@elonsoft/elonkit/ui/alert';

  @NgModule({
    ...
    providers: [{ provide: ESAlertLocale, useClass: ESAlertLocaleRU }]
  })
  export class AppModule {}
  `
};
