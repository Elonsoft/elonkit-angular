export const AUDIO_PLAYER_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESAudioPlayerLocale, ESAudioPlayerLocaleRU } from '@elonsoft/elonkit/ui/audio-player';

  @NgModule({
    ...
    providers: [{ provide: ESAudioPlayerLocale, useClass: ESAudioPlayerLocaleRU }]
  })
  export class AppModule {}
  `
};
