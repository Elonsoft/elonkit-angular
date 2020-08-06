import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-tooltip-story-interactive',
  templateUrl: './tooltip-story-interactive.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipStoryInteractiveComponent {
  @Input() esTooltipArrow: boolean;
}
