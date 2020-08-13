import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'es-audio-player-volume',
  templateUrl: './audio-player-volume.component.html',
  styleUrls: ['./audio-player-volume.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayerVolumeComponent {
  /**
   *  Default or previously set volume value in the range from 0 to 100.
   */
  @Input()
  set volume(value: number) {
    this.isMute = !value;
    this._volume = value;
  }
  get volume(): number {
    return this._volume;
  }
  private _volume: number;

  /**
   * Event emitted when need change volume.
   */
  @Output() changeVolume = new EventEmitter();

  /**
   * @internal
   * @ignore
   */
  public isMute = false;

  /**
   * @internal
   * @ignore
   */
  public onChangeVolume({ value }) {
    this.isMute = !value;
    this.changeVolume.emit(value / 100);
  }

  get src() {
    const iconName = this.isMute ? 'mute' : 'un-mute';

    return `./assets/elonkit/audio-player/${iconName}.svg`;
  }
}
