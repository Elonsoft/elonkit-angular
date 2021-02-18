import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-avatar-group',
  templateUrl: './avatar-story-group.component.html',
  styleUrls: ['./avatar-story-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryGroupComponent {
  public avatars = [
    {
      showStatus: true,
      statusSrc: '/icons/avatar/star.svg'
    },
    { avatarSrc: null }
  ];
}
