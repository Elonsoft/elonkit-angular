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
  Self,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  DoCheck
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';

import { validateFileType } from '~utils/validate-file-type';
import {
  ESDropzoneFile,
  ESDropzoneDefaultOptions,
  ESDropzoneValidationError
} from './dropzones.types';

export const ES_DROPZONE_DEFAULT_OPTIONS = new InjectionToken<ESDropzoneDefaultOptions>(
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
    reader.onerror = (error) => reject(error);
  });

@Component({
  selector: 'es-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESDropzoneComponent implements ControlValueAccessor, DoCheck {
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
  public heading: string;

  /**
   * Defines Drag Text Label.
   */
  @Input()
  public subheading: string;

  /**
   * File types to accept separated by a comma, e.g. `image/png,image/jpg,image/jpeg`
   */
  @Input()
  public get accept(): string {
    return this._accept;
  }
  public set accept(value: string) {
    this._accept = value || this.defaultOptions?.accept || '*';
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
    this._svgIcon = value || this.defaultOptions?.svgIcon;
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
    this._maxSize = coerceNumberProperty(value, this.defaultOptions?.maxSize || 0);
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
    this._type = value || this.defaultOptions?.type || 'binary';
  }
  private _type: 'base64' | 'binary';

  /**
   * Class applied to heading text.
   */
  @Input()
  public get headingTypography(): string {
    return this._headingTypography;
  }
  public set headingTypography(value: string) {
    this._headingTypography = value || this.defaultOptions?.headingTypography || 'mat-body-2';
  }
  private _headingTypography: string;

  /**
   * Class applied to subheading text.
   */
  @Input()
  public get subheadingTypography(): string {
    return this._subheadingTypography;
  }
  public set subheadingTypography(value: string) {
    this._subheadingTypography =
      value || this.defaultOptions?.subheadingTypography || 'mat-caption';
  }
  private _subheadingTypography: string;

  /**
   * Array of validation errors is emitted.
   */
  @Output()
  public validate: EventEmitter<ESDropzoneValidationError[]> = new EventEmitter<
    ESDropzoneValidationError[]
  >();

  /**
   * @internal
   * @ignore
   */
  @ViewChild('fileInput', { static: true })
  public fileInput: ElementRef;

  private propagateChange = (_: any) => {};
  private errors: ESDropzoneValidationError[];
  // tslint:disable-next-line: no-inferrable-types
  private errorState: boolean = false;

  /**
   * @internal
   * @ignore
   */
  constructor(
    private cdRef: ChangeDetectorRef,
    @Optional()
    @Inject(ES_DROPZONE_DEFAULT_OPTIONS)
    private defaultOptions: ESDropzoneDefaultOptions,
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
    this.headingTypography = this.defaultOptions?.headingTypography;
    this.subheadingTypography = this.defaultOptions?.subheadingTypography;
  }

  /**
   * @internal
   * @ignore
   */
  public ngDoCheck(): void {
    const newErrorState = this.isErrorState();
    if (this.errorState !== newErrorState) {
      this.cdRef.markForCheck();
      this.errorState = newErrorState;
    }
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
  public async onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.errors = [];
    const files = e.dataTransfer.files as FileList;
    for (let i = 0; i < files.length; i++) {
      await this.setFile(files.item(i));
    }
    this.isDragover = false;
    this.cdRef.markForCheck();
    this.propagateChange(this.files);
    this.validate.emit(this.errors);
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

  /**
   * @internal
   * @ignore
   */
  public async onChange(e: any) {
    e.stopPropagation();
    this.errors = [];
    const files = e.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      await this.setFile(files.item(i));
    }
    this.cdRef.markForCheck();
    this.propagateChange(this.files);
    this.validate.emit(this.errors);
  }

  /**
   * @internal
   * @ignore
   */
  public get invalid(): boolean {
    return this.errorState;
  }

  private async setFile(file: File) {
    if (!this.fileTypeValid(file) || !this.validateFileSize(file)) {
      return;
    }

    const targetFile = await toFile(this.type, file);
    this.files = [...this.files, targetFile];
  }

  private fileTypeValid(file: File): boolean {
    if (!validateFileType(file, this.accept)) {
      this.errors.push({
        fileName: file.name,
        error: 'FILE_TYPE'
      });
      return false;
    }
    return true;
  }

  private get maxSizeInBytes(): number {
    return +this.maxSize * 1024 * 1024;
  }

  private validateFileSize(file: File): boolean {
    if (this.maxSize && file.size > this.maxSizeInBytes) {
      this.errors.push({
        fileName: file.name,
        error: 'FILE_SIZE'
      });
      return false;
    }
    return true;
  }

  private isErrorState(): boolean {
    return !!(
      this.ngControl &&
      this.ngControl.invalid &&
      (this.ngControl.touched || (this.ngForm && this.ngForm.submitted))
    );
  }
}
