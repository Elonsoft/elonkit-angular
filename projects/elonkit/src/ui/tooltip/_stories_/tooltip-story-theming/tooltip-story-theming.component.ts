import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'es-tooltip-story-theming',
  templateUrl: './tooltip-story-theming.component.html',
  styleUrls: ['./tooltip-story-theming.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TooltipStoryThemingComponent {
  @Input() public esTooltipArrow: boolean;
}
