import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { ESAudioPlayerLocale } from '../../audio-player.component.locale';

@Component({
  selector: 'es-audio-player-options',
  templateUrl: './audio-player-options.component.html',
  styleUrls: ['./audio-player-options.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioPlayerOptionsComponent {
  /**
   *  Array of playback rates for audio.
   */
  @Input()
  public rates: number[];
  /**
   * Source of audio track.
   */
  @Input()
  public src: string;

  /**
   * Event emitted when playback rate is change.
   */
  @Output() public changePlaybackRate = new EventEmitter();

  /**
   * Event emitted when need to download audio track.
   */
  @Output() public audioDownload = new EventEmitter();

  /**
   * @internal
   * @ignore
   */
  public isRatePage = false;

  /**
   * @internal
   * @ignore
   */
  public currentRate = 1;

  /**
   * @internal
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public locale: ESAudioPlayerLocale
  ) {}

  /**
   * @internal
   * @ignore
   */
  public onChangePlaybackRate(value: number) {
    this.currentRate = value;
    this.changePlaybackRate.emit(value);
  }
}
