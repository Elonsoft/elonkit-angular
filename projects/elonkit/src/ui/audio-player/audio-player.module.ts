import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESAudioPlayerComponent } from './audio-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { ESTooltipModule } from '../tooltip';

import { ESAudioPlayerOptionsComponent } from './components/audio-player-options/audio-player-options.component';
import { ESAudioPlayerTimeSliderComponent } from './components/audio-player-time-slider/audio-player-time-slider.component';
import { ESAudioPlayerVolumeComponent } from './components/audio-player-volume/audio-player-volume.component';

@NgModule({
  declarations: [
    ESAudioPlayerComponent,
    ESAudioPlayerOptionsComponent,
    ESAudioPlayerTimeSliderComponent,
    ESAudioPlayerVolumeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSliderModule,
    FormsModule,
    MatMenuModule,
    MatListModule,
    ESTooltipModule
  ],
  exports: [ESAudioPlayerComponent]
})
export class ESAudioPlayerModule {}
