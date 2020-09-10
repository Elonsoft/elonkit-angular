import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-avatar-basic',
  templateUrl: './avatar-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryBasicComponent {
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
}
