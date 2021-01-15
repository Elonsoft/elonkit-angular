export const FILE_LIST_STORY_TYPOGRAPHY_SOURCE = {
  html: `
  <es-file-list
    fileNameTypography="typography-body-1"
    fileSizeTypography="typography-caption"
    [files]="files"
  ></es-file-list>
  `,
  ts: `
  @Component({
    ...
    encapsulation: ViewEncapsulation.None
  })
  export class AppComponent {
  }
  `,
  scss: `
  .typography {
    &-body-1 {
      color: rgba(0, 0, 0, 0.88);
      font-family: 'Roboto', sans-serif;
      font-size: 16px;
      line-height: 24px;
    }

    &-caption {
      color: rgba(0, 0, 0, 0.54);
      font-family: 'Roboto', sans-serif;
      font-size: 12px;
      line-height: 16px;
    }
  }`
};
