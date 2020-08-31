export const DROPZONE_STORY_CUSTOM_ICON_SOURCE = {
  ts: `
  export class AppComponent {
    public form = new FormGroup({
      docs: new FormControl([])
    });

    constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
      iconRegistry.addSvgIcon(
        'upload',
        sanitizer.bypassSecurityTrustResourceUrl('/icons/upload.svg')
      );
    }
  }
  `,
  html: `
  <form class="form" [formGroup]="form">
    <es-dropzone
      chooseText="CHOOSE FILES"
      dragText="or drag files in this area (max size: 50 MB)"
      formControlName="docs"
      [options]="{
        svgIcon: 'upload'
      }"
    >
      <mat-hint>This is an example of a hint message</mat-hint>
    </es-dropzone>
  </form>
  `
};
