import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { CoreModule } from '~storybook/core.module';

import { ESAudioPlayerModule } from '../..';
import { AudioPlayerStoryBasicComponent } from './audio-player-story-basic.component';

@NgModule({
  declarations: [AudioPlayerStoryBasicComponent],
  imports: [CommonModule, HttpClientModule, CoreModule, ESAudioPlayerModule],
  exports: [AudioPlayerStoryBasicComponent]
})
export class AudioPlayerStoryBasicModule {}
