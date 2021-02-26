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
  public size: number;
  @Input()
  public src: string;
  @Input()
  public variant: ESAvatarForm;
}
