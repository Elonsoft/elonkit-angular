import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { ESAvatarForm } from '../../avatar.types';
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

  public avatars = [
    {
      size: 60,
      src: '/img/es-logo.png',
      alt: 'alt text'
    },
    { avatarSrc: null, size: 60 },
    { avatarSrc: null, size: 60, textTypography: 'typography' }
  ];
}
