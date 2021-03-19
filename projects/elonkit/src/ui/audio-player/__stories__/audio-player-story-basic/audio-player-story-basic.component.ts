import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-audio-player-story-basic',
  styleUrls: ['./audio-player-story-basic.component.scss'],
  template: `<div class="audio-player">
    <es-audio-player [source]="source" [volume]="volume"></es-audio-player>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayerStoryBasicComponent {
  @Input() public source: string;
  @Input() public volume: number;

  constructor() {}
}
