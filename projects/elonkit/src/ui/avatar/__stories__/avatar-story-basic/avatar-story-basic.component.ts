import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { ESAvatarForm } from '../../avatar.types';
@Component({
  selector: 'es-avatar-basic',
  templateUrl: './avatar-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryBasicComponent {
  @Input()
  public alt: string;
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
  @Input()
  public src: string;
  @Input()
  public variant: ESAvatarForm;
  @Input()
  public statusBorderColor: string;
  @Input()
  public statusSrc: string;
}
