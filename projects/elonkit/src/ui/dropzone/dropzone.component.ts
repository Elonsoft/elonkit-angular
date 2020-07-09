import {
  Component,
  Input,
  forwardRef,
  Optional,
  Host,
  SkipSelf,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  AbstractControl,
  FormGroupDirective
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ESDropzoneFile, ESDropzoneOptions } from './dropzones.types';

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
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ESDropzoneComponent),
      multi: true
    }
  ]
})
export class ESDropzoneComponent implements ControlValueAccessor, OnInit {
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

  private readonly DEFAULT_OPTIONS = {
    accept:
      '.doc,.docx,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/pdf, image/jpg,image/jpeg,image/png',
    maxSize: 50,
    type: 'base64'
  };
  private _options: ESDropzoneOptions = this.DEFAULT_OPTIONS;
  private formControl: AbstractControl;
  private SNACK_BAR_CONFIG = { duration: 3000 };

  /**
   * Title Label.
   */
  @Input()
  public title: string;

  /**
   * Description Label.
   */
  @Input()
  public description: string;

  /**
   * Name of a formControl.
   */
  @Input()
  public formControlName: string;

  /**
   * Component options.
   */
  @Input()
  public set options(val: ESDropzoneOptions) {
    this._options = { ...this.DEFAULT_OPTIONS, ...val };
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
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional() public ngForm: FormGroupDirective
  ) {}

  /**
   * @internal
   * @ignore
   */
  public ngOnInit(): void {
    if (this.controlContainer) {
      if (this.formControlName) {
        this.formControl = this.controlContainer.control.get(this.formControlName);
      } else {
        console.warn('Missing FormControlName directive from host element of the component');
      }
    } else {
      console.warn('Cant find parent FormGroup directive');
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
    const control = this.formControl;
    const form = this.ngForm;
    this.cdRef.markForCheck();
    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }
    return false;
  }

  private async setFile(file: File) {
    if (!this.validateFileType(file) || !this.validateFileSize(file)) {
      return;
    }

    const targetFile = await toFile(this.options.type, file);
    this.files = [...this.files, targetFile];
    this.cdRef.detectChanges();
    this.propagateChange(this.files);
  }

  private getMaxSizeInBytes(): number {
    return this.options.maxSize * 1024 * 1024;
  }

  private validateFileSize(file: File): boolean {
    if (file.size > this.getMaxSizeInBytes()) {
      this.showSnackBar(`File size is over upload limit of ${this.options.maxSize} MB`);
      return false;
    }

    return true;
  }

  private validateFileType(file: File): boolean {
    if (!this.options.accept.includes(file.type)) {
      this.showSnackBar('This file type is not supported');
      return false;
    }

    return true;
  }

  private showSnackBar(text: string): void {
    this.snackBar.open(text, 'OK', this.SNACK_BAR_CONFIG);
  }
}
