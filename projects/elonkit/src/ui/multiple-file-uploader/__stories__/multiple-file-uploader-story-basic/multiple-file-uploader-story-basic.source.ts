export const MULTIPLE_FILE_UPLOADER_STORY_BASIC_SOURCE = {
  ts: `
  import { IESMultipleUploaderRemoveAction } from '@elonsoft/elonkit/ui/multiple-file-uploader/multiple-file-uploader.types';

  export class AppComponent {
    @Output()
    public removeFile: EventEmitter<IESMultipleUploaderRemoveAction> = new EventEmitter();

    public form = new FormGroup({
      docs: new FormControl([])
    });
    ...
    public onRemoveFile(data: IESMultipleUploaderRemoveAction): void {
      this.removeFile.emit(data);
    }
  }
  `,
  html: `
  <form class="form" [formGroup]="form">
    <es-multiple-file-uploader
      chooseText="CHOOSE FILES"
      maxSize="50"
      dragText="or drag file in this area (max size: 50 MB)"
      formControlName="docs"
      hint="This is an example of a hint message"
      (remove)="onRemoveFile($event)"
      accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,
      application/pdf, image/jpg,image/jpeg,image/png"
      type="binary"
    ></es-multiple-file-uploader>
  </form>
  `
};
