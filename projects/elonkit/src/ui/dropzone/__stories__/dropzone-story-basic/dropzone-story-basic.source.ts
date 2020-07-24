export const DROPZONE_STORY_BASIC_SOURCE = {
  ts: `
  export class AppComponent {
    public docs = new FormControl([]);
  }
  ...
  @NgModule({
    ...
    providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }]
  })
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
    >
      <mat-hint>This is an example of a hint message</mat-hint>
    </es-dropzone>
  </div>
  `
};
