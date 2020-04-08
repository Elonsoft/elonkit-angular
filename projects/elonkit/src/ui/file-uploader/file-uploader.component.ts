import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  forwardRef,
  Optional,
  Self
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgControl,
  FormGroupDirective
} from '@angular/forms';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { IValue } from './file-uploader.types';

const toImage = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

@Component({
  selector: 'es-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESFileUploaderComponent implements ControlValueAccessor {
  @Input() variant: 'list' | 'grid' = 'list';

  private _multiple = false;

  @Input()
  public get multiple(): boolean {
    return this._multiple;
  }
  public set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }

  private _required = false;

  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
  }

  @Input() accept = '*';

  value: IValue[] = [];

  constructor(
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    @Optional() @Self() public ngControl: NgControl,
    /**
     * @internal
     */
    @Optional() public ngForm: FormGroupDirective
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  public async onSelect(files: FileList) {
    const newValue: IValue[] = [];
    for (const file of Array.from(files)) {
      if (this.isFileAcceptable(file)) {
        if (file.type.startsWith('image')) {
          const preview = await toImage(file);
          newValue.push({ name: file.name, file, preview });
        } else {
          newValue.push({ name: file.name, file });
        }
      }
    }

    if (this.multiple) {
      this.value = this.value.concat(newValue);
    } else {
      this.value = newValue;
    }

    this.onChange(this.value);
    this.onTouched();
    this.changeDetector.detectChanges();
  }

  public onRemove(index) {
    this.value.splice(index, 1);
    this.onChange(this.value);
    this.onTouched();
  }

  public writeValue(value: IValue[]) {
    if (value !== undefined) {
      this.value = value;
      this.changeDetector.detectChanges();
    }
  }

  /**
   * @internal
   * @ignore
   */
  public registerOnChange(onChange: (value: IValue[]) => void) {
    this.onChange = onChange;
  }

  /**
   * @internal
   * @ignore
   */
  public onChange = (_: IValue[]) => {};

  /**
   * @internal
   * @ignore
   */
  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  /**
   * @internal
   * @ignore
   */
  public onTouched = () => {};

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

  private isFileAcceptable(file: File) {
    const types = this.accept.split(',').map(e => e.trim());

    if (types.includes('*')) {
      return true;
    }

    for (const type of types) {
      if (type.charAt(0) === '.' && file.name.toLowerCase().endsWith(type)) {
        return true;
      }

      if (type.endsWith('/*') && file.type.startsWith(type.replace(/\/.*$/, ''))) {
        return true;
      }

      if (file.type === type) {
        return true;
      }
    }

    return false;
  }
}
