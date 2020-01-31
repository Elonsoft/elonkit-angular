export const TIMEPICKER_STORY_REQUIRED_SOURCE = {
  html: `
  <mat-form-field appearance="outline">
    <mat-label>Time</mat-label>
    <es-timepicker [(ngModel)]="date" required></es-timepicker>
  </mat-form-field>
  `
};
