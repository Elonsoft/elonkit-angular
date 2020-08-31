export const DROPZONE_STORY_BASIC_SOURCE = {
  ts: `
  export class AppComponent {
    public docs = new FormControl([]);
  }
  `,
  html: `
  <div class="dropzone">
    <es-dropzone
      [chooseText]="chooseText"
      [dragText]="dragText"
      [formControl]="docs"
      [options]="{
        maxSize: maxSize,
        accept: accept,
        type: type
      }"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
    </es-dropzone>
  </div>
  `
};