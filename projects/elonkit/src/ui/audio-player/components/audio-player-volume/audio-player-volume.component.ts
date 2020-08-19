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
  public previuseVolume: number;

  /**
   * @internal
   * @ignore
   */
  public isMoveSlider = false;

  /**
   * @internal
   * @ignore
   */
  public onVolumeChanged(value: number) {
    this.isMoveSlider = false;
    this.isMute = !value;

    this.volume = value;

    if (!value) {
      this.previuseVolume = 0;
    }

    this.changeVolume.emit(value / 100);
  }

  /**
   * @internal
   * @ignore
   */
  public onVolumeSliderMove(value: number) {
    this.isMoveSlider = true;
    this.isMute = !value;

    this.changeVolume.emit(value / 100);
  }

  /**
   * @internal
   * @ignore
   */
  public onMute() {
    this.isMute = !this.isMute;

    if (this.isMute) {
      this.previuseVolume = this.volume;
      this.volume = 0;
    } else {
      this.volume = this.previuseVolume;
    }

    this.changeVolume.emit(this.volume / 100);
  }

  get src() {
    const iconName = this.isMute ? 'mute' : 'un-mute';

    return `./assets/elonkit/audio-player/${iconName}.svg`;
  }
}
