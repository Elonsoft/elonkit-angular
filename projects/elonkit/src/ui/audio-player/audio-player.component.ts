import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  InjectionToken,
  Optional,
  Inject,
  AfterViewInit
} from '@angular/core';

import { Observable } from 'rxjs';

import { ESLocale, ESLocaleService } from '../locale';

export interface ESAudioPlayerDefaultOptions {
  rates?: number[];
}

export const ES_AUDIO_PLAYER_DEFAULT_OPTIONS = new InjectionToken<ESAudioPlayerDefaultOptions>(
  'ES_AUDIO_PLAYER_DEFAULT_OPTIONS'
);

const DEFAULT_TIME = '00:00:00';

@Component({
  selector: 'es-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESAudioPlayerComponent implements AfterViewInit, OnDestroy {
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
  public set volume(value: number) {
    this._volume = value > 100 ? 100 : value;

    this.onSetVolume(this._volume);
  }
  public get volume(): number {
    return this._volume;
  }
  private _volume = 100;

  /**
   * Source of audio track.
   */
  @Input()
  public set source(value: string) {
    this.isAudioDataLoaded = false;

    if (value) {
      this.audio.src = value;

      this.audioCurrentTime = 0;
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
   * Event emitted when volume changed.
   */
  @Output() public volumeChanged = new EventEmitter<number>();

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
  public isAudioDataLoaded = false;

  /**
   * @internal
   * @ignore
   */
  public displayedTime = DEFAULT_TIME;

  /**
   * @internal
   * @ignore
   */
  public isDisplayedLeftTime = true;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  private onEnded = () => {
    // this.isAudioDataLoaded = false;
    this.audioEnded.emit(true);
  };

  private onLoadedData = ({ target }: Event) => {
    const { duration, currentTime } = target as any;
    this.isAudioDataLoaded = true;
    this.audio.volume = this.volume / 100;

    this.displayedTime = this.isDisplayedLeftTime
      ? this.formatTime(duration - currentTime)
      : this.formatTime(currentTime);

    // tslint:disable-next-line: no-string-literal
    if (!this.changeDetector['destroyed']) {
      this.changeDetector.detectChanges();
    }
  };

  private onTimeUpdate = ({ target }: Event) => {
    const { duration, currentTime } = target as any;

    this.audioCurrentTime = currentTime;

    this.displayedTime = this.isDisplayedLeftTime
      ? this.formatTime(duration - currentTime)
      : this.formatTime(currentTime);

    // tslint:disable-next-line: no-string-literal
    if (!this.changeDetector['destroyed']) {
      this.changeDetector.detectChanges();
    }
  };

  /**
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public localeService: ESLocaleService,
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
    this.locale$ = this.localeService.locale();
  }

  /**
   * @ignore
   */
  public ngAfterViewInit() {
    if (this.audio) {
      this.addEventsListener();
    }
  }

  /**
   * @ignore
   */
  public ngOnDestroy() {
    this.audio.src = null;
    this.audio.removeEventListener('ended', this.onEnded);
    this.audio.removeEventListener('loadeddata', this.onLoadedData);
    this.audio.removeEventListener('timeupdate', this.onTimeUpdate);
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
    if (this.audio) {
      this.audio.volume = value / 100;
      this.volumeChanged.emit(value);
    }
  }

  /**
   * @internal
   * @ignore
   */
  public onSeekTo(value: number) {
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
  public changeDisplayedTime() {
    this.isDisplayedLeftTime = !this.isDisplayedLeftTime;

    this.displayedTime = this.isDisplayedLeftTime
      ? this.formatTime(this.audio.duration - this.audioCurrentTime)
      : this.formatTime(this.audioCurrentTime);
  }

  private addEventsListener() {
    this.audio.addEventListener('loadeddata', this.onLoadedData);
    this.audio.addEventListener('timeupdate', this.onTimeUpdate);
    this.audio.addEventListener('ended', this.onEnded);
  }

  private formatTime(time: number): string {
    if (!time) {
      return DEFAULT_TIME;
    }

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = Math.round(time) - hours * 3600 - minutes * 60;

    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${h}:${m}:${s}`;
  }
}
