import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { ESEmptyStateIIcon } from '../../empty-state.types';

@Component({
  selector: 'es-empty-state-story-typography',
  templateUrl: './empty-state-story-typography.component.html',
  styleUrls: ['./empty-state-story-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class EmptyStateStoryTypographyComponent {
  @Input() icon: ESEmptyStateIIcon = 'box';
  @Input() heading: string;
  @Input() subheading: string;
}
