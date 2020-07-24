export const DROPZONE_STORY_TYPOGRAPHY_SOURCE = {
  html: `
  <form class="form" [formGroup]="form">
    <es-dropzone
      heading="CHOOSE FILES"
      subheading="or drag files in this area (max size: 50 MB)"
      headingTypography="typography-body-1"
      subheadingTypography="typography-caption"
      hintTypography="typography-caption"
      formControlName="docs"
    >
      <mat-hint class="typography-hint">This is an example of a hint message</mat-hint>
    </es-dropzone>
  </form>
  `,
  scss: `
  .form {
    max-width: 400px;
  }

  .typography {
    &-body-1 {
      color: #469582;
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      line-height: 24px;
    }

    &-caption {
      color: rgba(0, 0, 0, 0.38);
      font-family: 'Roboto', sans-serif;
      font-size: 14px;
      line-height: 16px;
    }

    &-hint {
      color: rgba(0, 0, 0, 0.6);
      font-size: 14px;
      line-height: 16px;
    }
  }`
};
