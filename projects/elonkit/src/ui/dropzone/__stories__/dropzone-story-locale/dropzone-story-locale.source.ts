export const DROPZONE_STORY_LOCALE_SOURCE = {
  ts: `
  import { ESDropzoneLocale, ESDropzoneLocaleRU } from '@elonsoft/elonkit/ui/dropzone';
  @NgModule({
    ...
    providers: [{ provide: ESDropzoneLocale, useClass: ESDropzoneLocaleRU }]
  })
  export class AppModule {}
  `,
  html: `
  <form class="form" [formGroup]="form">
    <es-dropzone
      heading="ВЫБЕРИТЕ ФАЙЛЫ"
      subheading=" или перетащите файлы в эту область (не более 50 мб)"
      maxSize="50"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
      application/pdf, image/jpg,image/jpeg,image/png"
      formControlName="docs"
    >
      <mat-hint>Пример текста подсказки</mat-hint>
    </es-dropzone>
  </form>
  `
};