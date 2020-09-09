import { Component, Input } from '@angular/core';

@Component({
  selector: 'es-avatar-custom',
  templateUrl: './avatar-story-custom.component.html'
})
export class AvatarStoryCustomComponent {
  @Input()
  public icon: string;
  @Input()
  public width: number;
  @Input()
  public height: number;
  @Input()
  public borderRadius: number;
  @Input()
  public showStatus: boolean;
  @Input()
  public statusWidth: number;
  @Input()
  public statusHeight: number;

  public logo = '/img/es-logo.png';
  public status = '/icons/avatar/star.svg';
}
