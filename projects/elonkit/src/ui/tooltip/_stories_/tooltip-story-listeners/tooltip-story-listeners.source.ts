export const TOOLTIP_STORY_LISTENERS_SOURCE = {
  html: `
  <button
    mat-flat-button
    color="primary"
    esTooltip
    [esTooltipContent]="content"
    esTooltipArrow
    esTooltipInteractive
    esTooltipDisableFocusListener
    esTooltipDisableCloseHoverListener
    esTooltipDisableCloseClickListener
  >
    Button
  </button>
  <ng-template #content let-hide="hide">
    Click this button to close the tooltip.
    <br /><br />
    <button mat-flat-button (click)="hide()">Close</button>
  </ng-template>
  `
};
