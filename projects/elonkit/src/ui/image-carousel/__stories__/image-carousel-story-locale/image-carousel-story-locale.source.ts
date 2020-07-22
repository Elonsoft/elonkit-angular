export const IMAGE_CAROUSEL_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESImageCarouselLocale, ESImageCarouselLocaleRU } from '@elonsoft/elonkit/ui/image-carousel';
  @NgModule({
    ...
    providers: [{ provide: ESImageCarouselLocale, useClass: ESImageCarouselLocaleRU }]
  })
  export class AppModule {}
  `
};
