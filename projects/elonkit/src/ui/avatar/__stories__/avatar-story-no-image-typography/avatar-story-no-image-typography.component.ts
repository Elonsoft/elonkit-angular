import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { ESAvatarVariant } from '../../avatar.types';
@Component({
  selector: 'es-avatar-typography',
  templateUrl: './avatar-story-no-image-typography.component.html',
  styleUrls: ['./avatar-story-no-image-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryNoImageTypographyComponent {
  @Input()
  public size: number;
  @Input()
  public variant: ESAvatarVariant;
  @Input()
  public textTypography: string;
}
