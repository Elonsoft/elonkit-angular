import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
@Component({
  selector: 'es-avatar-group-aomponent',
  templateUrl: './avatar-story-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryGroupComponent {
  @Input()
  public size: number;

  public avatars = [
    {
      size: 40,
      src: '/img/es-logo.png',
      alt: 'alt text'
    },
    { src: null, size: 40 },
    { src: null, size: 40 }
  ];
}
