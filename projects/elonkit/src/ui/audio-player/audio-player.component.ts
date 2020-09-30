import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';

export interface ESAudioPlayerDefaultOptions {
  rates?: number[];
}

export const ES_AUDIO_PLAYER_DEFAULT_OPTIONS = new InjectionToken<ESAudioPlayerDefaultOptions>(
  'ES_AUDIO_PLAYER_DEFAULT_OPTIONS'
);

const DEFAULT_TIME = '- 00:00:00';

@Component({
  selector: 'es-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESAudioPlayerComponent implements OnDestroy {
  /**
   *  Array of playback rates for audio.
   */
  @Input()
  public set rates(value: number[]) {
    this._rates = value || this.defaultOptions?.rates || [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  }
  public get rates(): number[] {
    return this._rates;
  }
  private _rates: number[];

  /**
   *  Default or previously set volume value in the range from 0 to 100.
   */
  @Input()
  public volume = 100;

  /**
   * Source of audio track.
   */
  @Input()
  public set source(value: string) {
    if (value) {
      this.audio.src = value;

      this.audioCurrentTime = 0;

      this.addEventsListener();
    }
  }

  /**
   * Event emitted when audio track playback completed.
   */
  @Output() public audioEnded = new EventEmitter();

  /**
   * Event emitted when need to download audio track.
   */
  @Output() public audioDownload = new EventEmitter();

  /**
   * Event emitted when volume change.
   */
  @Output() public volumeChanged = new EventEmitter<number>();

  /**
   * @internal
   * @ignore
   */
  @ViewChild('timeLine', { static: true }) public elementTimeLine: MatSlider;

  /**
   * @internal
   * @ignore
   */
  public audio: HTMLAudioElement = new Audio();

  /**
   * @internal
   * @ignore
   */
  public audioCurrentTime = 0;

  /**
   * @internal
   * @ignore
   */
  public audioTimeLeft = DEFAULT_TIME;

  /**
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    private changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_AUDIO_PLAYER_DEFAULT_OPTIONS)
    private defaultOptions: ESAudioPlayerDefaultOptions
  ) {
    this.rates = defaultOptions?.rates;
  }

  /**
   * @ignore
   */
  public ngOnDestroy() {
    this.audio.src = null;
    this.audio.removeEventListener('ended', this.onEnded);
  }

  /**
   * @internal
   * @ignore
   */
  public onPlayback() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
  }

  /**
   * @internal
   * @ignore
   */
  public onSetVolume(value: number) {
    this.audio.volume = value;
    this.volumeChanged.emit(value);
  }

  /**
   * @internal
   * @ignore
   */
  public onSeekTo({ value }) {
    this.audio.currentTime = value;
  }

  /**
   * @internal
   * @ignore
   */
  public onSetPlaybackRate(value: number) {
    this.audio.playbackRate = value;
  }

  /**
   * @internal
   * @ignore
   */
  public get src() {
    const iconName = this.audio.paused ? 'play' : 'pause';

    return `./assets/elonkit/audio-player/${iconName}.svg`;
  }

  private addEventsListener() {
    this.audio.addEventListener('loadeddata', ({ target }) => {
      const { duration } = target as any;
      this.audio.volume = this.volume / 100;
      this.audioTimeLeft = this.formatTime(duration);

      // tslint:disable-next-line: no-string-literal
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });

    this.audio.addEventListener('ended', this.onEnded);

    this.audio.addEventListener('timeupdate', ({ target }) => {
      const { duration, currentTime } = target as any;

      if (!this.elementTimeLine._isSliding) {
        this.audioCurrentTime = currentTime;
      }

      this.audioTimeLeft = this.formatTime(duration - currentTime);

      // tslint:disable-next-line: no-string-literal
      if (!this.changeDetector['destroyed']) {
        this.changeDetector.detectChanges();
      }
    });
  }

  private onEnded = () => {
    this.audioEnded.emit(true);
  };

  private formatTime(timeLeft: number): string {
    if (!timeLeft) {
      return DEFAULT_TIME;
    }

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft - hours * 3600) / 60);
    const seconds = Math.round(timeLeft) - hours * 3600 - minutes * 60;

    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `- ${h}:${m}:${s}`;
  }
}
