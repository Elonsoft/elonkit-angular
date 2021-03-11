import {
  Component,
  Input,
  ChangeDetectionStrategy,
  InjectionToken,
  Optional,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { ESAvatarDefaultOptions, ESAvatarVariant } from './avatar.types';

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
   * Defines form of the avatar: round | square.
   */
  public avatarForm = ESAvatarVariant;

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
   * Class applied to text.
   */
  @Input()
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography = value || 'es-subtitle-2';
  }
  private _typography: string;

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
  public get variant(): ESAvatarVariant {
    return this._variant;
  }
  public set variant(value: ESAvatarVariant) {
    this._variant = value || this.avatarForm.Round;
  }
  private _variant: ESAvatarVariant;

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
    this.typography = this.defaultOptions?.typography;
    this.variant = this.defaultOptions?.variant;
  }
}
