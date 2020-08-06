import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-tooltip-story-basic',
  templateUrl: './tooltip-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipStoryBasicComponent {
  @Input() esTooltipArrow: boolean;
}
