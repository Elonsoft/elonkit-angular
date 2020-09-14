import {
  Component,
  Input,
  Optional,
  Inject,
  InjectionToken,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import { ESBadgeSizeOption, ESBadgeTypographyOption } from './badge.types';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_TYPOGRAPHY = 'mat-body-1';
const DEFAULT_COLOR = '#fff';
const DEFAULT_BACKGROUND_COLOR = '#000';
const DEFAULT_SIZE = 'md';
const DEFAULT_ACTION_LABEL = 'clear';

export interface ESBadgeDefaultOptions {
  typography?: ESBadgeTypographyOption;
  size?: ESBadgeSizeOption;
  color?: string;
  backgroundColor?: string;
  actionLabel: string;
}

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
  private sizeOptions: { [key in ESBadgeSizeOption]: string } = {
    lg: '24px',
    md: '20px',
    sm: '16px'
  };

  @Input()
  public content: string;

  private _color;

  /**
   * Class applied color.
   */
  @Input()
  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value || this.defaultOptions?.color || DEFAULT_COLOR;
  }

  private _backgroundColor;

  /**
   * Class applied background color.
   */
  @Input()
  public get backgroundColor(): string {
    return this._backgroundColor;
  }
  public set backgroundColor(value: string) {
    this._backgroundColor =
      value || this.defaultOptions?.backgroundColor || DEFAULT_BACKGROUND_COLOR;
  }

  private _typography;

  /**
   * Class applied to text.
   */
  @Input()
  public get typography(): ESBadgeTypographyOption {
    return this._typography;
  }
  public set typography(value: ESBadgeTypographyOption) {
    this._typography = value || this.defaultOptions?.typography || DEFAULT_TYPOGRAPHY;
  }

  private _size;

  /**
   * Class applied size.
   */
  @Input()
  public get size(): ESBadgeSizeOption {
    return this._size;
  }
  public set size(value: ESBadgeSizeOption) {
    this._size = value || this.defaultOptions?.size || DEFAULT_SIZE;
  }

  private _actionLabel;

  /**
   * Class applied size.
   */
  @Input()
  public get actionLabel(): string {
    return this._actionLabel;
  }
  public set actionLabel(value: string) {
    this._actionLabel = value || this.defaultOptions?.actionLabel || DEFAULT_ACTION_LABEL;
  }

  /**
   * Event emitted when user clicks button.
   */
  @Output()
  public clicked = new EventEmitter();

  /**
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    private matIconRegistry: MatIconRegistry,
    /**
     * @internal
     */
    private domSanitizer: DomSanitizer,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_BADGE_DEFAULT_OPTIONS)
    private defaultOptions: ESBadgeDefaultOptions
  ) {
    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/elonkit/badge/close.svg')
    );

    this.typography = defaultOptions?.typography || DEFAULT_TYPOGRAPHY;
    this.color = defaultOptions?.color || DEFAULT_COLOR;
    this.backgroundColor = defaultOptions?.backgroundColor || DEFAULT_BACKGROUND_COLOR;
    this.size = defaultOptions?.size || DEFAULT_SIZE;
    this.actionLabel = defaultOptions?.actionLabel || DEFAULT_ACTION_LABEL;
  }

  public get contentStyle() {
    return {
      marginRight: this.size === 'sm' ? '6px' : '8px',
      color: this.color,
      backgroundColor: this.backgroundColor,
      width: this.sizeOptions[this.size],
      height: this.sizeOptions[this.size]
    };
  }

  /**
   * @internal
   * @ignore
   */
  public onClick() {
    this.clicked.emit();
  }
}
