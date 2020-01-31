export const TIMEPICKER_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESTimepickerLocale, ESTimepickerLocaleRU } from '@elonsoft/elonkit/ui/timepicker';

  @NgModule({
    ...
    providers: [{ provide: ESTimepickerLocale, useClass: ESTimepickerLocaleRU }]
  })
  export class AppModule {}
  `
};
