import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { ESEmptyStateIIcon } from './empty-state.types';

export interface ESEmptyStateDefaultOptions {
  icon?: ESEmptyStateIIcon;
  headingTypography?: string;
  subheadingTypography?: string;
}

export const ES_EMPTY_STATE_DEFAULT_OPTIONS = new InjectionToken<ESEmptyStateDefaultOptions>(
  'ES_EMPTY_STATE_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESEmptyStateComponent {
  private _icon;

  /**
   * Icon to diaplsy.
   */
  @Input()
  get icon(): ESEmptyStateIIcon {
    return this._icon;
  }
  set icon(value: ESEmptyStateIIcon) {
    this._icon = value || this.defaultOptions?.icon || 'box';
  }

  /**
   * Path to image to display instead of the prebuilt icon.
   */
  @Input() iconSrc?: string;

  /**
   * Heading text.
   */
  @Input() heading: string;

  private _headingTypography;

  /**
   * Class applied to heading text.
   */
  @Input()
  get headingTypography(): string {
    return this._headingTypography;
  }
  set headingTypography(value: string) {
    this._headingTypography = value || this.defaultOptions?.headingTypography || 'mat-h4';
  }

  /**
   * Subheading text.
   */
  @Input() subheading: string;

  private _subheadingTypography;

  /**
   * Class applied to subheading text.
   */
  @Input()
  get subheadingTypography(): string {
    return this._subheadingTypography;
  }
  set subheadingTypography(value: string) {
    this._subheadingTypography =
      value || this.defaultOptions?.subheadingTypography || 'mat-caption';
  }

  /**
   * @internal
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_EMPTY_STATE_DEFAULT_OPTIONS)
    private defaultOptions: ESEmptyStateDefaultOptions
  ) {
    this.icon = this.defaultOptions?.icon;
    this.headingTypography = this.defaultOptions?.headingTypography;
    this.subheadingTypography = this.defaultOptions?.subheadingTypography;
  }

  /**
   * @internal
   * @ignore
   */
  get src() {
    return this.iconSrc || `./assets/elonkit/empty-state/${this.icon}.svg`;
  }
}
