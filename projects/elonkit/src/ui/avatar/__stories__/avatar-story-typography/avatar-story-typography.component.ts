import { Component, ChangeDetectionStrategy, Input, ViewEncapsulation } from '@angular/core';
import { ESAvatarForm } from '../../avatar.types';
@Component({
  selector: 'es-avatar-typography',
  templateUrl: './avatar-story-typography.component.html',
  styleUrls: ['./avatar-story-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AvatarStoryTypographyComponent {
  @Input()
  public alt: string;
  @Input()
  public size: number;
  @Input()
  public borderRadius: number;
  @Input()
  public showStatus: boolean;
  @Input()
  public statusSize: number;
  @Input()
  public statusBorderWidth: number;
  @Input()
  public variant: ESAvatarForm;
  @Input()
  public statusBorderColor: string;
  @Input()
  public statusSrc: string;
}
