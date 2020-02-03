export const TIMEPICKER_STORY_BASIC_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class FormComponent {
    public date = new Date();
  }
  `,
  html: `
  <mat-form-field appearance="outline">
    <mat-label>Time</mat-label>
    <es-timepicker [(ngModel)]="date"></es-timepicker>
  </mat-form-field>
  `
};
