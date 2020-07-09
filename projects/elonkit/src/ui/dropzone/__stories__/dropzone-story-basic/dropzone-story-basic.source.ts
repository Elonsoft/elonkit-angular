export const DROPZONE_STORY_BASIC_SOURCE = {
  ts: `
  export class AppComponent {
    public form = new FormGroup({
      docs: new FormControl([])
    });
  }
  `,
  html: `
  <form class="form" [formGroup]="form">
    <es-dropzone
      title="CHOOSE FILES"
      description="or drag files in this area (max size: 50 MB)"
      formControlName="docs"
      [options]="{
        maxSize: 50,
        accept:
          '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
        application/pdf, image/jpg,image/jpeg,image/png',
        type: 'binary'
      }"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
    </es-dropzone>
  </form>
  `
};
