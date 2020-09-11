import {
  Component,
  Input,
  ChangeDetectionStrategy,
  InjectionToken,
  Optional,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Observable } from 'rxjs';

import { ESAvatarDefaultOptions, ESAvatarIcon } from './avatar.types';
import { ESLocale, ESLocaleService } from '../locale';

export const ES_AVATAR_DEFAULT_OPTIONS = new InjectionToken<ESAvatarDefaultOptions>(
  'ES_AVATAR_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESAvatarComponent {
  /**
   * Defines which prebuilt icon will be used if avatarSrc isn't set.
   */
  @Input()
  public get icon(): ESAvatarIcon {
    return this._icon || 'account-round';
  }
  public set icon(value: ESAvatarIcon) {
    this._icon = value;
  }
  private _icon: ESAvatarIcon;

  /**
   * Path to image to display instead of the prebuilt icon.
   */
  @Input() public avatarSrc?: string;

  /**
   * Defines height of the avatar in pixels.
   */
  @Input()
  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = coerceNumberProperty(value, 40);
  }
  private _height: number;

  /**
   * Defines width of the avatar in pixels.
   */
  @Input()
  public get width(): number {
    return this._width;
  }
  public set width(value: number) {
    this._width = coerceNumberProperty(value, 40);
  }
  private _width: number;

  /**
   * Defines border radius of the avatar in pixels.
   */
  @Input()
  public get borderRadius(): number {
    return this._borderRadius;
  }
  public set borderRadius(value: number) {
    this._borderRadius = coerceNumberProperty(value, 999);
  }
  private _borderRadius: number;

  /**
   * Defines whether to display avatar status.
   */
  @Input()
  public get showStatus(): boolean {
    return this._showStatus;
  }
  public set showStatus(value: boolean) {
    this._showStatus = coerceBooleanProperty(value);
  }
  private _showStatus: boolean;

  /**
   * Path to image to display as a status.
   */
  @Input() public statusSrc?: string;

  /**
   * Defines width of status in pixels.
   */
  @Input()
  public get statusWidth(): number {
    return this._statusWidth;
  }
  public set statusWidth(value: number) {
    this._statusWidth = coerceNumberProperty(value, 10);
  }
  private _statusWidth: number;

  /**
   * Defines height of status in pixels.
   */
  @Input()
  public get statusHeight(): number {
    return this._statusHeight;
  }
  public set statusHeight(value: number) {
    this._statusHeight = coerceNumberProperty(value, 10);
  }
  private _statusHeight: number;

  /**
   * Defines width of status border in pixels.
   */
  @Input()
  public get statusBorderWidth(): number {
    return this._statusBorderWidth;
  }
  public set statusBorderWidth(value: number) {
    this._statusBorderWidth = coerceNumberProperty(value, 2);
  }
  private _statusBorderWidth: number;

  /**
   * Text to display instead of avatar, to show user initials as an example.
   */
  @Input() public text?: string;

  /**
   * Class applied to text.
   */
  @Input()
  public get textTypography(): string {
    return this._textTypography;
  }
  public set textTypography(value: string) {
    this._textTypography = value || 'mat-body-2';
  }
  private _textTypography: string;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  /**
   * @internal
   * @ignore
   */
  constructor(
    @Optional()
    @Inject(ES_AVATAR_DEFAULT_OPTIONS)
    private defaultOptions: ESAvatarDefaultOptions,
    private localeService: ESLocaleService
  ) {
    this.icon = this.defaultOptions?.icon;
    this.width = this.defaultOptions?.width;
    this.height = this.defaultOptions?.height;
    this.borderRadius = this.defaultOptions?.borderRadius;
    this.showStatus = this.defaultOptions?.showStatus;
    this.statusHeight = this.defaultOptions?.statusHeight;
    this.statusWidth = this.defaultOptions?.statusWidth;
    this.statusBorderWidth = this.defaultOptions?.statusBorderWidth;
    this.textTypography = this.defaultOptions?.textTypography;
    this.locale$ = this.localeService.locale();
  }

  /**
   * @internal
   * @ignore
   */
  public get src(): string {
    return this.avatarSrc || `./assets/elonkit/avatar/${this.icon}.svg`;
  }
}
