import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-avatar-custom',
  templateUrl: './avatar-story-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
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
  @Input()
  public statusBorderWidth: number;

  public logo = '/img/es-logo.png';
  public status = '/icons/avatar/star.svg';
}
