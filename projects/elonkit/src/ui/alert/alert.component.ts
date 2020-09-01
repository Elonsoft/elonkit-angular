import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Observable } from 'rxjs';

import { ESAlertVariant } from './alert.types';
import { ESLocaleService, ESLocale } from '../i18n';

export interface ESAlertDefaultOptions {
  typography?: string;
  iconMapping?: { [key in ESAlertVariant]?: { icon?: string; svgIcon?: string } };
}

const DEFAULT_TYPOGRAPHY = 'mat-body-1';

const DEFAULT_ICON_MAPPING = {
  default: { icon: 'info' },
  info: { icon: 'info' },
  success: { icon: 'check_circle' },
  warning: { icon: 'warning' },
  error: { icon: 'error' }
};

export const ES_ALERT_DEFAULT_OPTIONS = new InjectionToken<ESAlertDefaultOptions>(
  'ES_ALERT_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESAlertComponent {
  private iconMapping: { [key in ESAlertVariant]: { icon?: string; svgIcon?: string } };

  /**
   * The variant of the alert. This defines the color and icon used.
   */
  @Input() public variant: ESAlertVariant = 'default';

  private _typography;

  /**
   * Class applied to text.
   */
  @Input()
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography =
      value || (this.defaultOptions && this.defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  private _closable = false;

  /**
   * Show close button.
   */
  @Input()
  public get closable(): boolean {
    return this._closable;
  }
  public set closable(closable: boolean) {
    this._closable = coerceBooleanProperty(closable);
  }

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() public icon?: string;

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() public svgIcon?: string;

  /**
   * Event emitted when user clicks close button.
   */
  @Output() public closed = new EventEmitter();

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
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    private localeService: ESLocaleService,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_ALERT_DEFAULT_OPTIONS)
    private defaultOptions: ESAlertDefaultOptions
  ) {
    this.locale$ = this.localeService.locale();

    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
    this.iconMapping = { ...DEFAULT_ICON_MAPPING, ...defaultOptions?.iconMapping };
  }

  /**
   * @internal
   * @ignore
   */
  public onClose() {
    this.closed.emit();
  }

  public get currentIcon() {
    if (this.icon) {
      return { icon: this.icon };
    }
    if (this.svgIcon) {
      return { svgIcon: this.svgIcon };
    }
    return this.iconMapping[this.variant];
  }
}
