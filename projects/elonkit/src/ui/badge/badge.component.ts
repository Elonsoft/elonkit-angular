import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  InjectionToken,
  Optional,
  Inject
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
export class ESBadgeComponent {
  /**
   * Defines badge size in pixels.
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    this._size = coerceNumberProperty(value, 16);
  }
  private _size: number;

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
   * Defines badge border color.
   */
  @Input()
  public get borderColor(): string {
    return this._borderColor;
  }
  public set borderColor(value: string) {
    this._borderColor = value;
  }
  private _borderColor: string;

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
    private defaultOptions: ESBadgeDefaultOptions
  ) {
    this.size = this.defaultOptions?.size;
    this.bottom = this.defaultOptions?.bottom;
    this.right = this.defaultOptions?.right;
  }
}
