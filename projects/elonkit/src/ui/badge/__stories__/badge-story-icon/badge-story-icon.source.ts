export const BADGE_STORY_ICON_SOURCE = {
  html: `
  <es-badge [size]="size" [src]="src" [alt]="alt" [borderColor]="borderColor" [borderSize]="borderSize">
    <es-avatar></es-avatar>
  </es-badge>
  <es-badge [size]="size" [src]="src" [alt]="alt" [borderColor]="borderColor" [borderSize]="borderSize">
    <button type="button" color="primary" mat-icon-button>
      <mat-icon>favorite</mat-icon>
    </button>
  </es-badge>
  `
};
