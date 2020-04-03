import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

interface IValue {
  name: string;
  file: File;
  preview?: string;
}

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
export class ESFileUploaderComponent {
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

  constructor(public changeDetector: ChangeDetectorRef) {}

  public async onChange(files: FileList) {
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

    this.changeDetector.detectChanges();
  }

  public onRemove(index) {
    this.value.splice(index, 1);
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
