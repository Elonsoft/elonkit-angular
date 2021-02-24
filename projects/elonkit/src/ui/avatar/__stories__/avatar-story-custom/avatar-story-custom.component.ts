import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ESAvatarForm } from '../../avatar.types';
@Component({
  selector: 'es-avatar-custom',
  templateUrl: './avatar-story-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryCustomComponent {
  @Input()
  public size: number;
  @Input()
  public alt: string;
  @Input()
  public borderRadius: number;
  @Input()
  public showStatus: boolean;
  @Input()
  public statusSize: number;
  @Input()
  public statusBorderWidth: number;
  @Input()
  public avatarSrc: string;
  @Input()
  public variant: ESAvatarForm;
  @Input()
  public statusBorderColor: string;
  @Input()
  public statusSrc: string;

  public logo = '/img/es-logo.png';
  public status = '/icons/avatar/star.svg';
}
