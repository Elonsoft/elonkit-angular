import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  InjectionToken,
  Optional,
  Inject,
  ElementRef,
  Renderer2,
  OnInit,
  AfterViewInit,
  ViewChild
} from '@angular/core';

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ESBadgeDefaultOptions } from './badge.types';

export const ES_BADGE_DEFAULT_OPTIONS = new InjectionToken<ESBadgeDefaultOptions>(
  'ES_BADGE_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBadgeComponent implements OnInit, AfterViewInit {
  /**
   * Defines parent element width.
   */
  public parentWidth = 40;

  /**
   * Defines badge size in pixels.
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    this._size = coerceNumberProperty(value, 14);
  }
  private _size: number;

  /**
   * Defines badge border width in pixels.
   */
  @Input()
  public get borderSize(): number {
    return this._borderSize;
  }
  public set borderSize(value: number) {
    this._borderSize = coerceNumberProperty(value, 2);
  }
  private _borderSize: number;

  /**
   * Defines badge background color.
   */
  @Input()
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }
  private _color: string;

  /**
   * Defines badge position top in pixels.
   */
  @Input()
  public get top(): number {
    return this._top;
  }
  public set top(value: number) {
    this._top = coerceNumberProperty(value);
  }
  private _top: number;

  /**
   * Defines badge position bottom in pixels.
   */
  @Input()
  public get bottom(): number {
    return this._bottom;
  }
  public set bottom(value: number) {
    this._bottom = coerceNumberProperty(value, 0) || -2;
  }
  private _bottom: number;

  /**
   * Defines badge position right in pixels.
   */
  @Input()
  public get right(): number {
    return this._right;
  }
  public set right(value: number) {
    this._right = coerceNumberProperty(value, 0) || -2;
  }
  private _right: number;

  /**
   * Defines badge position left in pixels.
   */
  @Input()
  public get left(): number {
    return this._left;
  }
  public set left(value: number) {
    this._left = coerceNumberProperty(value);
  }
  private _left: number;

  /**
   * Path to image to display icon.
   */
  @Input() public src?: string;

  /**
   * Alt text for icon
   */
  @Input() public alt?: string;

  /**
   * Defines badge count.
   */
  @Input()
  public get count(): number {
    return this._count;
  }
  public set count(value: number) {
    this._count = coerceNumberProperty(value);
  }
  private _count: number;

  /**
   * Child element, passing to ng-content.
   */
  @ViewChild('childElement')
  public childElement: ElementRef;

  /**
   * @internal
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional()
    @Inject('ES_BADGE_DEFAULT_OPTIONS')
    private defaultOptions: ESBadgeDefaultOptions,
    private _elementRef: ElementRef,
    private renderer: Renderer2
  ) {
    this.size = this.defaultOptions?.size;
    this.bottom = this.defaultOptions?.bottom;
    this.right = this.defaultOptions?.right;
    this.borderSize = this.defaultOptions?.borderSize;
  }

  public ngOnInit() {
    this._elementRef.nativeElement.style.setProperty('--right', `${-this.right + 1 + `px`}`);
    this._elementRef.nativeElement.style.setProperty('--bottom', `${-this.bottom + 1 + `px`}`);
    this._elementRef.nativeElement.style.setProperty('--borderSize', `${this.borderSize + `px`}`);
    this._elementRef.nativeElement.style.setProperty(
      '--transparent',
      `${this.size / 2 + this.borderSize + 1 + `px`}`
    );
  }

  public ngAfterViewInit() {
    const childElement = this.childElement.nativeElement.offsetWidth;
    this._elementRef.nativeElement.style.setProperty('--childElement', `${childElement + `px`}`);
  }
}
