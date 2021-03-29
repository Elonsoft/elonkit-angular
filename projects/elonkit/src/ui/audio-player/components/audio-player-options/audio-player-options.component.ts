import {
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

import { Observable } from 'rxjs';

import { ESLocale, ESLocaleService } from '../../../locale';

@Component({
  selector: 'es-audio-player-options',
  templateUrl: './audio-player-options.component.html',
  styleUrls: ['./audio-player-options.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESAudioPlayerOptionsComponent {
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
   * Event emitted when playback rate is changed.
   */
  @Output() public playbackRateChanged = new EventEmitter();

  /**
   * Event emitted when need to download audio track.
   */
  @Output() public downloadClicked = new EventEmitter();

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
  public onChangePlaybackRate(value: number) {
    this.currentRate = value;
    this.playbackRateChanged.emit(value);
  }
}
