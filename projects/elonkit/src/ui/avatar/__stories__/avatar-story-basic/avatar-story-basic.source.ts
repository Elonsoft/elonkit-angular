export const AVATAR_STORY_BASIC_SOURCE = {
  ts: `
  export class AppComponent {
    public docs = new FormControl([]);
  }
  `,
  html: `
  <div class="dropzone">
    <es-dropzone
      [heading]="heading"
      [subheading]="subheading"
      [maxSize]="maxSize"
      [accept]="accept"
      [type]="type"
      [formControl]="docs"
      (validate)="validate($event)"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
    </es-dropzone>
  </div>
  `
};
