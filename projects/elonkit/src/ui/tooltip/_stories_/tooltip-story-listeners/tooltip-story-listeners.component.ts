import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-tooltip-story-listeners',
  templateUrl: './tooltip-story-listeners.component.html',
  styleUrls: ['./tooltip-story-listeners.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipStoryListenersComponent {
  @Input() esTooltipArrow: boolean;
  @Input() esTooltipDisableFocusListener: boolean;
  @Input() esTooltipDisableHoverListener: boolean;
  @Input() esTooltipDisableCloseFocusListener: boolean;
  @Input() esTooltipDisableCloseHoverListener: boolean;
  @Input() esTooltipDisableCloseClickListener: boolean;
}
