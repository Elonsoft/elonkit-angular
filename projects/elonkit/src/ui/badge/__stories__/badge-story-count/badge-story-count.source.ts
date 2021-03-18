export const BADGE_STORY_COUNT_SOURCE = {
  html: `
  <es-badge
    [size]="size"
    [color]="color"
    [borderColor]="borderColor"
    [borderSize]="borderSize"
    [count]="count"
    [position]="position"
    [offsetHorizontal]="offsetHorizontal"
    [offsetVertical]="offsetVertical"
  >
    <es-avatar></es-avatar>
  </es-badge>
  <es-badge
    [size]="size"
    [color]="color"
    [borderColor]="borderColor"
    [borderSize]="borderSize"
    [count]="count"
    [position]="position"
    [offsetHorizontal]="offsetHorizontal"
    [offsetVertical]="offsetVertical"
  >
    <button type="button" color="primary" mat-icon-button>
      <mat-icon>favorite</mat-icon>
    </button>
  </es-badge>
  `
};
