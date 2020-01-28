export const INLINE_FORM_FIELD_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESInlineFormFieldLocale, ESInlineFormFieldLocaleRU } from '@elonsoft/elonkit/ui/inline-form-field';

  @NgModule({
    ...
    providers: [{ provide: ESInlineFormFieldLocale, useClass: ESInlineFormFieldLocaleRU }]
  })
  export class AppModule {}
  `
};
