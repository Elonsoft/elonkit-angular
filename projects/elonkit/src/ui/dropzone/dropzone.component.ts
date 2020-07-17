import {
  Component,
  Input,
  Optional,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation,
  InjectionToken,
  Inject,
  Self
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { validateFileType } from '~utils/validate-file-type';
import { ESDropzoneFile, ESDropzoneOptions } from './dropzones.types';
import { ESDropzoneLocale } from './dropzone.component.locale';

export const ES_DROPZONE_DEFAULT_OPTIONS = new InjectionToken<ESDropzoneOptions>(
  'ES_DROPZONE_DEFAULT_OPTIONS'
);

const toFile = (type: string, file: File) =>
  new Promise<ESDropzoneFile>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve({
        content: type === 'binary' ? file : (reader.result as string),
        name: file.name,
        size: file.size,
        type: file.type,
        base64: reader.result as string
      });
    };
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'es-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ESDropzoneComponent implements ControlValueAccessor {
  /**
   * @internal
   * @ignore
   */
  public files: ESDropzoneFile[];

  /**
   * @internal
   * @ignore
   */
  public isDragover: boolean;

  private readonly DEFAULT_OPTIONS: ESDropzoneOptions = {
    accept: '*',
    svgIcon: null,
    maxSize: null,
    type: 'base64'
  };
  private _options: ESDropzoneOptions;

  /**
   * Choose text Label.
   */
  @Input()
  public chooseText: string;

  /**
   * Drag text Label.
   */
  @Input()
  public dragText: string;

  /**
   * Component options.
   */
  @Input()
  public set options(val: ESDropzoneOptions) {
    this._options = { ...this.DEFAULT_OPTIONS, ...this.defaultOptions, ...val };
  }
  public get options(): ESDropzoneOptions {
    return this._options;
  }

  /**
   * @internal
   * @ignore
   */
  @ViewChild('fileInput', { static: true })
  public fileInput: ElementRef;

  private propagateChange = (_: any) => {};

  /**
   * @internal
   * @ignore
   */
  constructor(
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    private locale: ESDropzoneLocale,
    @Optional()
    @Inject(ES_DROPZONE_DEFAULT_OPTIONS)
    private defaultOptions: ESDropzoneOptions,
    /**
     * @internal
     */
    @Optional()
    @Self()
    public ngControl: NgControl,
    /**
     * @internal
     */
    @Optional() public ngForm: FormGroupDirective
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.options = { ...this.DEFAULT_OPTIONS, ...defaultOptions };
  }

  /**
   * @internal
   * @ignore
   */
  public writeValue(files: ESDropzoneFile[]): void {
    this.files = files;
  }

  /**
   * @internal
   * @ignore
   */
  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  /**
   * @internal
   * @ignore
   */
  public registerOnTouched(fn: any): void {}

  /**
   * @internal
   * @ignore
   */
  public onDrop(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files as FileList;
    for (let i = 0; i < files.length; i++) {
      this.setFile(files.item(i));
    }

    this.isDragover = false;
  }

  /**
   * @internal
   * @ignore
   */
  public onDragover(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragover = true;
  }

  /**
   * @internal
   * @ignore
   */
  public onDragleave(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragover = false;
  }

  /**
   * @internal
   * @ignore
   */
  public onDragend(e: DragEvent): void {
    e.preventDefault();
    e.stopPropagation();
    this.isDragover = false;
  }

  /**
   * @internal
   * @ignore
   */
  public openSelectFileDialog(): void {
    const input = this.fileInput.nativeElement;
    input.value = null;
    input.click();
  }

  /**07
   * @internal
   * @ignore
   */
  public onChange(e: any): void {
    e.stopPropagation();
    const files = e.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      this.setFile(files.item(i));
    }
  }

  /**
   * @internal
   * @ignore
   */
  public get invalid(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;
    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }
    return false;
  }

  private async setFile(file: File) {
    if (!this.fileTypeValid(file) || !this.validateFileSize(file)) {
      return;
    }

    const targetFile = await toFile(this.options.type, file);
    this.files = [...this.files, targetFile];
    this.cdRef.markForCheck();
    this.propagateChange(this.files);
  }

  public fileTypeValid(file: File): boolean {
    if (validateFileType(file, this.options.accept)) {
      return true;
    }
    this.showSnackBar(this.locale.labelNotSupported);
    return false;
  }

  private getMaxSizeInBytes(): number {
    return this.options.maxSize * 1024 * 1024;
  }

  private validateFileSize(file: File): boolean {
    const { labelOverUploadLimit, labelMB } = this.locale;
    if (this.options.maxSize && file.size > this.getMaxSizeInBytes()) {
      this.showSnackBar(`${labelOverUploadLimit} ${this.options.maxSize} ${labelMB}`);
      return false;
    }
    return true;
  }

  private showSnackBar(text: string): void {
    this.snackBar.open(text, 'OK');
  }
}
