import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs';

import { ESLocale, ESLocaleService } from '../../../locale';

@Component({
  selector: 'es-audio-player-volume',
  templateUrl: './audio-player-volume.component.html',
  styleUrls: ['./audio-player-volume.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESAudioPlayerVolumeComponent {
  /**
   *  Default or previously set volume value in the range from 0 to 100.
   */
  @Input()
  public set volume(value: number) {
    this.isMute = !value;
    this._volume = value;
  }
  public get volume(): number {
    return this._volume;
  }
  private _volume: number;

  /**
   * Event emitted when user changes volume.
   */
  @Output() public volumeChanged = new EventEmitter();

  /**
   * @internal
   * @ignore
   */
  public isMute = false;

  /**
   * @internal
   * @ignore
   */
  public previuseVolume = 0;

  /**
   * @internal
   * @ignore
   */
  public isMoveSlider = false;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  /**
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public localeService: ESLocaleService
  ) {
    this.locale$ = this.localeService.locale();
  }

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
    this.volumeChanged.emit(value);
  }

  /**
   * @internal
   * @ignore
   */
  public onVolumeSliderMove(value: number) {
    this.isMoveSlider = true;
    this.isMute = !value;

    this.volumeChanged.emit(value);
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

    this.volumeChanged.emit(this.volume);
  }
}
