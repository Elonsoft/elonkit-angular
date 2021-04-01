import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  InjectionToken,
  Inject,
  Optional,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';

export type ActionHeadingType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface ESActonHeadingDefaultOptions {
  type?: ActionHeadingType;
  typography?: string;
  actionIcon?: string;
  actionSvgIcon?: string;
  actionLabel?: string;
}

export const ES_ACTION_HEADING_DEFAULT_OPTIONS = new InjectionToken<ESActonHeadingDefaultOptions>(
  'ES_ACTION_HEADING_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-action-heading',
  templateUrl: './action-heading.component.html',
  styleUrls: ['./action-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESActionHeadingComponent {
  private _type: ActionHeadingType;
  private _typography: string;
  private _actionIcon: string;
  private _actionSvgIcon: string;
  private _actionLabel: string;

  /**
   * Heading text.
   */
  @Input()
  public text: string;

  /**
   * Heading text type.
   */
  @Input()
  public get type(): ActionHeadingType {
    return this._type;
  }
  public set type(value: ActionHeadingType) {
    this._type = value || this.defaultOptions?.type || 'h1';
  }

  /**
   * Heading text typography.
   */
  @Input()
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography = value || this.defaultOptions?.typography || 'mat-h1';
  }
  /**
   * Action icon.
   */
  @Input()
  public get actionIcon(): string {
    return this._actionIcon;
  }
  public set actionIcon(value: string) {
    this._actionIcon = value || this.defaultOptions?.actionIcon || 'add';
  }

  /**
   * Action svg icon.
   */
  @Input()
  public get actionSvgIcon(): string {
    return this._actionSvgIcon;
  }
  public set actionSvgIcon(value: string) {
    this._actionSvgIcon = value || this.defaultOptions?.actionSvgIcon;
  }

  /**
   * Aria-label of the action button.
   */
  @Input()
  public get actionLabel(): string {
    return this._actionLabel;
  }
  public set actionLabel(value: string) {
    this._actionLabel = value || this.defaultOptions?.actionLabel || 'add';
  }

  /**
   * Color of the action button.
   */
  @Input()
  public color: 'primary' | 'warn' | 'accent' = 'primary';

  /**
   * Event emitted when user clicks button.
   */
  @Output()
  public action: EventEmitter<any> = new EventEmitter();

  constructor(
    /**
     * @internal
     */
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_ACTION_HEADING_DEFAULT_OPTIONS)
    private defaultOptions: ESActonHeadingDefaultOptions
  ) {
    this.type = this.defaultOptions?.type;
    this.typography = this.defaultOptions?.typography;
  }
}
