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
  ViewChild
} from '@angular/core';

import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ESBadgeDefaultOptions, ESBadgePositionVariant, ESBadgePositions } from './badge.types';

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
    this._size = coerceNumberProperty(value, 14);
  }
  private _size: number;

  /**
   * Defines badge position.
   */
  @Input()
  public get position(): ESBadgePositionVariant {
    return this._position;
  }
  public set position(value: ESBadgePositionVariant) {
    this._position = value || 'below after';
    this.setPositions();
  }
  private _position: ESBadgePositionVariant;

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
   * @internal
   * @ignore
   */
  public get top(): number {
    return this._top;
  }
  public set top(value: number) {
    this._top = coerceNumberProperty(value);
    this.setPositions();
  }
  private _top: number;

  /**
   * @internal
   * @ignore
   */
  public get bottom(): number {
    return this._bottom;
  }
  public set bottom(value: number) {
    this._bottom = coerceNumberProperty(value);
    this.setPositions();
  }
  private _bottom: number;

  /**
   * @internal
   * @ignore
   */
  public get right(): number {
    return this._right;
  }
  public set right(value: number) {
    this._right = coerceNumberProperty(value);
    this.setPositions();
  }
  private _right: number;

  /**
   * @internal
   * @ignore
   */
  public get left(): number {
    return this._left;
  }
  public set left(value: number) {
    this._left = coerceNumberProperty(value);
    this.setPositions();
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

  private badgePosition = ESBadgePositions;

  /**
   * Defines badge vertical offset.
   */
  @Input()
  public get offsetVertical(): number {
    return this._offsetVertical;
  }
  public set offsetVertical(value: number) {
    this._offsetVertical = coerceNumberProperty(value);
  }
  private _offsetVertical: number;

  /**
   * Defines badge horizontal offset.
   */
  @Input()
  public get offsetHorizontal(): number {
    return this._offsetHorizontal;
  }
  public set offsetHorizontal(value: number) {
    this._offsetHorizontal = coerceNumberProperty(value);
  }
  private _offsetHorizontal: number;

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
    private _elementRef: ElementRef
  ) {
    this.size = this.defaultOptions?.size;
    this.position = this.defaultOptions?.position;
    this.offsetVertical = this.defaultOptions?.offsetVertical;
    this.offsetHorizontal = this.defaultOptions?.offsetHorizontal;
    this.borderSize = this.defaultOptions?.borderSize;
  }

  private setPositions() {
    setTimeout(() => {
      const childElement = this.childElement.nativeElement.offsetWidth;
      const transparent = this.size / 2 + this.borderSize;

      switch (this.position) {
        case this.badgePosition.AboveAfter: {
          this.top = 0;
          this.right = -1;
          this.offsetVertical = childElement - transparent;
          this.offsetHorizontal = this.borderSize * 2;
          break;
        }
        case this.badgePosition.AboveBefore: {
          this.top = 0;
          this.left = 0;
          this.offsetVertical = childElement - transparent;
          this.offsetHorizontal = this.offsetVertical;
          break;
        }
        case this.badgePosition.BelowAfter: {
          this.bottom = -1;
          this.right = -1;
          this.offsetVertical = this.borderSize * 2;
          this.offsetHorizontal = this.borderSize * 2;
          break;
        }
        case this.badgePosition.BelowBefore: {
          this.left = 0;
          this.bottom = -1;
          this.offsetVertical = this.borderSize * 2;
          this.offsetHorizontal = childElement - transparent;
          break;
        }
      }
      this.setOffsets();
      this.setStyles();
      this.changeDetector.detectChanges();
    }, 1000);
  }

  private setOffsets(): void {
    this._elementRef.nativeElement.style.setProperty(
      '--offsetVertical',
      `${this.offsetVertical + `px`}`
    );
    this._elementRef.nativeElement.style.setProperty(
      '--offsetHorizontal',
      `${this.offsetHorizontal + `px`}`
    );
  }

  private setStyles() {
    const childElement = this.childElement.nativeElement.offsetWidth;
    this._elementRef.nativeElement.style.setProperty('--borderSize', `${this.borderSize + `px`}`);
    this._elementRef.nativeElement.style.setProperty(
      '--transparent',
      `${this.size / 2 + this.borderSize + 1 + `px`}`
    );
    this._elementRef.nativeElement.style.setProperty('--childElement', `${childElement + `px`}`);
  }
}
