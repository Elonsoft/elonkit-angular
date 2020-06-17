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
  Output,
  EventEmitter,
  ChangeDetectorRef
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ControlContainer,
  AbstractControl
} from '@angular/forms';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SNACK_BAR_CONFIG, IMAGE_TYPES } from './multiple-file-uploader.configs';
import {
  IESMultipleUploaderRemoveAction,
  IESMultipleUploaderChangeAction,
  IESMultipleUploaderFile
} from './multiple-file-uploader.types';

@Component({
  selector: 'es-multiple-file-uploader',
  templateUrl: './multiple-file-uploader.component.html',
  styleUrls: ['./multiple-file-uploader.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ESMultipleFileUploaderComponent),
      multi: true
    }
  ]
})
export class ESMultipleFileUploaderComponent implements ControlValueAccessor, OnInit {
  public safetyImage: SafeResourceUrl;
  public formControl: AbstractControl;
  public files: any[] = [];
  public IMAGE_TYPES = IMAGE_TYPES;

  @Input()
  public isLoading: boolean;
  @Input()
  public showImages: boolean;
  @Input()
  public chooseText: string;
  @Input()
  public dragText: string;
  @Input()
  public accept = '';
  @Input()
  public maxSize: number;
  @Input()
  public formControlName: string;
  @Input()
  public hint: string;
  @Input()
  public type: 'binary' | 'base64' = 'base64';

  @ViewChild('fileInput', { static: true })
  public fileInput: ElementRef;
  @ViewChild('dragndrop', { static: false })
  private dragndrop: ElementRef;

  @Output()
  // tslint:disable-next-line: no-output-native
  public change: EventEmitter<IESMultipleUploaderChangeAction> = new EventEmitter();
  @Output()
  public remove: EventEmitter<IESMultipleUploaderRemoveAction> = new EventEmitter();

  private propagateChange = (_: any) => {};

  constructor(
    @Optional()
    @Host()
    @SkipSelf()
    private controlContainer: ControlContainer,
    private snackBar: MatSnackBar,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit() {
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

  public writeValue(files: any[]) {
    this.files = files;
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {}

  public onDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files as FileList;
    for (let i = 0; i < files.length; i++) {
      this.setFile(files.item(i));
    }

    this.removeDragoverClass(this.dragndrop.nativeElement);
  }

  public onDragover(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.addDragoverClass(this.dragndrop.nativeElement);
  }

  public onDragleave(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.removeDragoverClass(this.dragndrop.nativeElement);
  }

  public onDragend(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.removeDragoverClass(this.dragndrop.nativeElement);
  }

  public openSelectFileDialog() {
    const { nativeElement } = this.fileInput;
    nativeElement.value = null;
    nativeElement.click();
  }

  public onChange(event: any) {
    event.stopPropagation();
    const files = event.target.files as FileList;
    for (let i = 0; i < files.length; i++) {
      this.setFile(files.item(i));
    }
  }

  public removeImage() {
    this.remove.emit();
  }

  public invalid() {
    return this.formControl.touched && this.formControl.invalid;
  }

  public removeFile(obj: { file: IESMultipleUploaderFile; index: number }) {
    this.remove.emit(obj);
    if (!obj.file.id) {
      this.files.splice(obj.index, 1);
      this.cdRef.detectChanges();
    }
  }

  public isShowImageScroller() {
    return this.showImages && this.filesHasImages();
  }

  private filesHasImages() {
    return (
      this.files &&
      !!this.files.find(
        (item: IESMultipleUploaderFile) => IMAGE_TYPES.includes(item.type) && !item.deleted
      )
    );
  }

  private setFile(file: File) {
    if (!this.validateFileType(file) || !this.validateFileSize(file)) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ({ target: { result } }: any) => {
      const targetFile = {
        content: result,
        name: file.name,
        size: file.size,
        type: file.type,
        base64: this.showImages ? result : null
      };

      if (this.type === 'base64') {
        this.files = [...this.files, targetFile];
      } else if (this.type === 'binary') {
        targetFile.content = file;
        this.files = [...this.files, targetFile];
      }
      this.cdRef.detectChanges();
      this.propagateChange(this.files);
      this.change.emit({ files: this.files });
    };
  }

  private getMaxSizeInBytes() {
    return this.maxSize * 1024 * 1024;
  }

  private addDragoverClass(element: Element) {
    element.classList.add('dragover');
  }

  private removeDragoverClass(element: Element) {
    element.classList.remove('dragover');
  }

  private validateFileSize(file) {
    if (file.size > this.getMaxSizeInBytes()) {
      this.showSnackBar('FILE_UPLOADER.MAX_FILE_SIZE_ERROR', { maxSize: this.maxSize });
      return false;
    }

    return true;
  }

  private validateFileType(file: any) {
    if (!this.accept.includes(file.type)) {
      this.showSnackBar('FILE_UPLOADER.FILE_TYPE_ERROR');
      return false;
    }

    return true;
  }

  private showSnackBar(text: string, opt?) {
    this.snackBar.open(text, 'OK', SNACK_BAR_CONFIG);
  }
}
