import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { MatSlider } from '@angular/material/slider';

const TIME_LINE_RANGE = 8;
const TOOLTIP_OFFSET = 21;

@Component({
  selector: 'es-audio-player-time-slider',
  templateUrl: './audio-player-time-slider.component.html',
  styleUrls: ['./audio-player-time-slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESAudioPlayerTimeSliderComponent {
  /** The duration in seconds of the current media resource. */
  @Input() public duration: number;

  /** The current playback position, in seconds */
  @Input() public set audioCurrentTime(time: number) {
    if (!this.elementTimeLine._isSliding) {
      this._audioCurrentTime = time;
    }
  }
  public get audioCurrentTime(): number {
    return this._audioCurrentTime;
  }
  private _audioCurrentTime: number;

  /** Emits the current playback position, in seconds. */
  @Output() public timeUpdated = new EventEmitter();

  /**
   * @internal
   * @ignore
   */
  @ViewChild('timeLine', { static: true }) public elementTimeLine: MatSlider;

  /**
   * @internal
   * @ignore
   */
  @ViewChild('timeTooltip', { static: true }) public elementTimeTooltip: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  public tooltipIsShow = false;

  /**
   * @internal
   * @ignore
   */
  public tooltipTime = null;

  /**
   * @internal
   * @ignore
   */
  public tooltipPosition: string | null = null;

  /**
   * @internal
   * @ignore
   */
  @HostListener('mouseleave')
  public onMouseLeave() {
    this.hideTooltip();
  }

  /**
   * @internal
   * @ignore
   */
  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: MouseEvent) {
    if (!this.duration) {
      return;
    }

    const container = this.elementRef.nativeElement.getBoundingClientRect();

    const minTop = container.top + container.height / 2 - TIME_LINE_RANGE;
    const maxBottom = container.bottom - container.height / 2 + TIME_LINE_RANGE;

    const scrollTop = document.scrollingElement.scrollTop;
    const scrollLeft = document.scrollingElement.scrollLeft;

    if (
      event.pageX >= container.left + scrollLeft &&
      event.pageX <= container.right + scrollLeft &&
      event.pageY > minTop + scrollTop &&
      event.pageY < maxBottom + scrollTop
    ) {
      this.tooltipIsShow = true;

      this.renderer2.setAttribute(this.elementTimeTooltip.nativeElement, 'style', 'display: block');

      const tooltipWidth = this.elementTimeTooltip.nativeElement.clientWidth;

      const currentPositionX = event.pageX - container.left - scrollLeft;

      this.tooltipTime = this.calculateTime(container.width, currentPositionX);

      const tooltipPositionX = event.pageX - container.left - scrollLeft - tooltipWidth / 2;

      if (container.top > TOOLTIP_OFFSET) {
        this.tooltipPosition = 'top';

        this.renderer2.setAttribute(
          this.elementTimeTooltip.nativeElement,
          'style',
          `display: block; top: ${-TOOLTIP_OFFSET}px; left: ${tooltipPositionX}px`
        );
      } else {
        this.tooltipPosition = 'bottom';

        this.renderer2.setAttribute(
          this.elementTimeTooltip.nativeElement,
          'style',
          `display: block; bottom: ${-TOOLTIP_OFFSET}px; left: ${tooltipPositionX}px`
        );
      }
    } else {
      this.hideTooltip();
    }
  }

  /**
   * @internal
   * @ignore
   */
  constructor(private renderer2: Renderer2, private elementRef: ElementRef<HTMLElement>) {}

  /**
   *
   * @internal
   * @ignore
   */
  public onSeekTo({ value }) {
    this.timeUpdated.emit(value);
  }

  /**
   * @internal
   * @ignore
   */
  private hideTooltip() {
    if (this.tooltipIsShow) {
      this.tooltipIsShow = false;
      this.tooltipPosition = null;

      this.renderer2.setAttribute(this.elementTimeTooltip.nativeElement, 'style', `display: none;`);
    }
  }

  /**
   * @internal
   * @ignore
   */
  private calculateTime(timelineLength: number, position: number): string {
    const stepSize = this.duration / timelineLength;

    return this.formatTime(stepSize * position);
  }

  /**
   * @internal
   * @ignore
   */
  private formatTime(timeLeft: number): string {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft - hours * 3600) / 60);
    const seconds = Math.round(timeLeft) - hours * 3600 - minutes * 60;

    const h = hours < 10 ? `0${hours}` : `${hours}`;
    const m = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const s = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${h}:${m}:${s}`;
  }
}
