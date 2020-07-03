export const DRAG_AND_DROP_STORY_REQUIRED_SOURCE = {
  ts: `
  export class AppComponent {
    public form = new FormGroup({
      docs: new FormControl([], Validators.required)
    });
    ...
    public onSubmit(form: any) {}
  }
  `,
  html: `
  <form #f="ngForm" class="form" [formGroup]="form" (ngSubmit)="onSubmit(f)">
    <es-drag-and-drop
      title="CHOOSE FILES"
      description="or drag files in this area (max size: 50 MB)"
      maxSize="50"
      formControlName="docs"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
      application/pdf, image/jpg,image/jpeg,image/png"
      type="binary"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
      <mat-error>Select at least one file</mat-error></es-drag-and-drop
    >
    <button class="form__submit" color="primary" mat-raised-button type="submit">Submit</button>
  </form>
  `,
  scss: `
  .form {
    max-width: 744px;

    &__submit {
      margin-top: 15px;
      text-transform: uppercase;
    }
  }
  `
};
