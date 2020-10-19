import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-tooltip-story-listeners',
  templateUrl: './tooltip-story-listeners.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TooltipStoryListenersComponent {
  @Input() public esTooltipArrow: boolean;
  @Input() public esTooltipDisableFocusListener: boolean;
  @Input() public esTooltipDisableHoverListener: boolean;
  @Input() public esTooltipDisableCloseFocusListener: boolean;
  @Input() public esTooltipDisableCloseHoverListener: boolean;
  @Input() public esTooltipDisableCloseClickListener: boolean;
}
