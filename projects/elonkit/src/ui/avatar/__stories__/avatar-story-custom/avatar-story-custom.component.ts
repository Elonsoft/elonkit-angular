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
  public width: number;
  @Input()
  public height: number;
  @Input()
  public altText: string;
  @Input()
  public borderRadius: number;
  @Input()
  public showStatus: boolean;
  @Input()
  public statusWidth: number;
  @Input()
  public statusHeight: number;
  @Input()
  public statusBorderWidth: number;
  @Input()
  public avatarSrc: string;
  @Input()
  public formType: ESAvatarForm;
  @Input()
  public statusBorderColor: string;
  @Input()
  public statusSrc: string;

  public logo = '/img/es-logo.png';
  public status = '/icons/avatar/star.svg';
}
