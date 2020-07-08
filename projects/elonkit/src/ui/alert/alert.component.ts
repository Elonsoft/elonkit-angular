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

import { ESAlertVariant } from './alert.types';
import { ESAlertLocale } from './alert.component.locale';

export interface ESAlertDefaultOptions {
  typography?: string;
  iconMapping?: { [key in ESAlertVariant]?: { icon: string } | { svgIcon: string } };
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
  private iconMapping: { [key in ESAlertVariant]: { icon: string } | { svgIcon: string } };

  /**
   * The variant of the alert. This defines the color and icon used.
   */
  @Input() variant: ESAlertVariant = 'default';

  private _typography;

  /**
   * Class applied to text.
   */
  @Input()
  get typography(): string {
    return this._typography;
  }
  set typography(value: string) {
    this._typography =
      value || (this.defaultOptions && this.defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  private _closable = false;

  /**
   * Show close button.
   */
  @Input()
  get closable(): boolean {
    return this._closable;
  }
  set closable(closable: boolean) {
    this._closable = coerceBooleanProperty(closable);
  }

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() icon?: string;

  /**
   * Override the icon displayed before the text.
   * Unless provided, the icon is mapped to the value of the variant input.
   */
  @Input() svgIcon?: string;

  /**
   * Event emitted when user clicks close button.
   */
  @Output() closed = new EventEmitter();

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
    public locale: ESAlertLocale,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_ALERT_DEFAULT_OPTIONS)
    private defaultOptions: ESAlertDefaultOptions
  ) {
    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
    this.iconMapping = { ...DEFAULT_ICON_MAPPING, ...defaultOptions?.iconMapping };
  }

  /**
   * @internal
   * @ignore
   */
  onClose() {
    this.closed.emit();
  }

  get currentIcon() {
    if (this.icon) {
      return { icon: this.icon };
    }
    if (this.svgIcon) {
      return { svgIcon: this.svgIcon };
    }
    return this.iconMapping[this.variant];
  }
}
