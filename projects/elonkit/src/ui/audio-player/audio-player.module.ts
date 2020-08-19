import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESAudioPlayerComponent } from './audio-player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AudioPlayerVolumeComponent } from './components/audio-player-volume/audio-player-volume.component';
import { AudioPlayerOptionsComponent } from './components/audio-player-options/audio-player-options.component';
import { ESTooltipModule } from '../tooltip';

@NgModule({
  declarations: [ESAudioPlayerComponent, AudioPlayerVolumeComponent, AudioPlayerOptionsComponent],
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
  exports: [ESAudioPlayerComponent, AudioPlayerVolumeComponent, AudioPlayerOptionsComponent]
})
export class ESAudioPlayerModule {}
