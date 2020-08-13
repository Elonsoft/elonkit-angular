import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioPlayerStoryLocaleComponent } from './audio-player-story-locale.component';

import { ESAudioPlayerModule, ESAudioPlayerLocale, ESAudioPlayerLocaleRU } from '../..';

@NgModule({
  declarations: [AudioPlayerStoryLocaleComponent],
  imports: [CommonModule, ESAudioPlayerModule],
  exports: [AudioPlayerStoryLocaleComponent],
  providers: [{ provide: ESAudioPlayerLocale, useClass: ESAudioPlayerLocaleRU }]
})
export class AudioPlayerStoryLocaleModule {}
