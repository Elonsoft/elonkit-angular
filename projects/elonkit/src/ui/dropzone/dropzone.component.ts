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
import { coerceNumberProperty } from '@angular/cdk/coercion';

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

  /**
   * Defines Choose Text Label.
   */
  @Input()
  public chooseText: string;

  /**
   * Defines Drag Text Label.
   */
  @Input()
  public dragText: string;

  /**
   * File types to accept separated by a comma, e.g. `image/png,image/jpg,image/jpeg`
   */
  @Input()
  public get accept(): string {
    return this._accept;
  }
  public set accept(value: string) {
    this._accept = value ?? this.defaultOptions?.accept ?? '*';
  }
  private _accept: string;

  /**
   * Custom svg icon to render with `chooseText`.
   */
  @Input()
  public get svgIcon(): string {
    return this._svgIcon;
  }
  public set svgIcon(value: string) {
    this._svgIcon = value ?? this.defaultOptions?.svgIcon;
  }
  private _svgIcon: string;

  /**
   * Max accepted file size in megabytes.
   */
  @Input()
  public get maxSize(): number {
    return this._maxSize;
  }
  public set maxSize(value: number) {
    this._maxSize = coerceNumberProperty(value, 0) ?? this.defaultOptions?.maxSize;
  }
  private _maxSize: number;

  /**
   * Defines if ESDropzoneFile `content` property will be `base64` or `binary` format.
   */
  @Input()
  public get type(): 'base64' | 'binary' {
    return this._type;
  }
  public set type(value: 'base64' | 'binary') {
    this._type = value ?? this.defaultOptions?.type ?? 'binary';
  }
  private _type: 'base64' | 'binary';

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
    this.accept = this.defaultOptions?.accept;
    this.svgIcon = this.defaultOptions?.svgIcon;
    this.maxSize = this.defaultOptions?.maxSize;
    this.type = this.defaultOptions?.type;
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

    const targetFile = await toFile(this.type, file);
    this.files = [...this.files, targetFile];
    this.cdRef.markForCheck();
    this.propagateChange(this.files);
  }

  private fileTypeValid(file: File): boolean {
    if (validateFileType(file, this.accept)) {
      return true;
    }
    this.showSnackBar(this.locale.labelNotSupported);
    return false;
  }

  private getMaxSizeInBytes(): number {
    return +this.maxSize * 1024 * 1024;
  }

  private validateFileSize(file: File): boolean {
    const { labelOverUploadLimit, labelMB } = this.locale;
    if (this.maxSize && file.size > this.getMaxSizeInBytes()) {
      this.showSnackBar(`${labelOverUploadLimit} ${this.maxSize} ${labelMB}`);
      return false;
    }
    return true;
  }

  private showSnackBar(text: string): void {
    this.snackBar.open(text, 'OK');
  }
}
