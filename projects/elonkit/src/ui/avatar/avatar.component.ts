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

import { ESAvatarDefaultOptions, ESAvatarForm } from './avatar.types';

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
  public avatarForm = ESAvatarForm;

  /**
   * Defines size of the avatar in pixels.
   */
  @Input()
  public get size(): number {
    return this._size;
  }
  public set size(value: number) {
    this._size = coerceNumberProperty(value, 40);
  }
  private _size: number;

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
   * Text fro alt attribute
   */
  @Input() public alt?: string;

  /**
   * Src for avatar image
   */
  @Input() public src?: string;

  /**
   * The shape of the avatar.
   */
  @Input()
  public get variant(): ESAvatarForm {
    return this._variant;
  }
  public set variant(value: ESAvatarForm) {
    this._variant = value || this.avatarForm.Round;
  }
  private _variant: ESAvatarForm;

  /**
   * @internal
   * @ignore
   */
  constructor(
    @Optional()
    @Inject(ES_AVATAR_DEFAULT_OPTIONS)
    private defaultOptions: ESAvatarDefaultOptions
  ) {
    this.size = this.defaultOptions?.size;
    this.textTypography = this.defaultOptions?.textTypography;
    this.variant = this.defaultOptions?.variant;
  }
}
