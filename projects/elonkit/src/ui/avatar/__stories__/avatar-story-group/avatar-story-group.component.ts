import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { ESAvatarDefaultOptions, ESAvatarForm } from '../../avatar.types';
@Component({
  selector: 'es-avatar-group-aomponent',
  templateUrl: './avatar-story-group.component.html',
  styleUrls: ['./avatar-story-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryGroupComponent {
  @Input()
  public size: number;

  @Input()
  public variant: ESAvatarForm;

  public avatars = [
    {
      showStatus: true,
      statusSrc: '/icons/avatar/star.svg',
      statusSize: 14,
      src: '/img/es-logo.png'
    },
    { avatarSrc: null },
    { avatarSrc: null, textTypography: 'typography' }
  ];
}
