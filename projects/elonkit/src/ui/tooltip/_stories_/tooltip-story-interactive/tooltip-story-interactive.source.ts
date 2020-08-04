export const TOOLTIP_STORY_INTERACTIVE_SOURCE = {
  html: `
  <button
    mat-flat-button
    color="primary"
    esTooltip
    esTooltipArrow
    esTooltipInteractive
    [esTooltipContent]="content"
  >
    Button
  </button>
  <ng-template #content>
    This is a tooltip with an interactive content
    <button mat-flat-button>Action</button>
  </ng-template>
  `
};
