import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { validateFileType } from '~utils/validate-file-type';
import { ESFileListLocale } from './file-list.component.locale';
import { ESFileListFile, ESFileListRemoveAction, ESFileListOptions } from './file-list.types';

export const ES_FILE_LIST_DEFAULT_OPTIONS = new InjectionToken<ESFileListOptions>(
  'ES_FILE_LIST_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESFileListComponent {
  private readonly DEFAULT_OPTIONS: ESFileListOptions = {
    imageTypes: 'image/*',
    hideImages: false,
    canRemove: false,
    canDownload: false
  };
  private _options: ESFileListOptions;

  /**
   * Options object to apply to component.
   */
  @Input()
  public get options(): ESFileListOptions {
    return this._options;
  }
  public set options(value: ESFileListOptions) {
    this._options = { ...this.DEFAULT_OPTIONS, ...this.defaultOptions, ...value };
  }

  /**
   * Array of files to display.
   */
  @Input()
  public files: ESFileListFile[];

  /**
   * Object with removed file and its index is emitted.
   */
  @Output()
  public remove: EventEmitter<ESFileListRemoveAction> = new EventEmitter();

  /**
   * File is emitted on download.
   */
  @Output()
  public download: EventEmitter<ESFileListFile> = new EventEmitter();

  public fileTypeValid(file: ESFileListFile): boolean {
    return validateFileType(file, this.options.imageTypes);
  }

  constructor(
    public locale: ESFileListLocale,
    @Optional()
    @Inject(ES_FILE_LIST_DEFAULT_OPTIONS)
    private defaultOptions: ESFileListOptions
  ) {
    this.options = { ...this.DEFAULT_OPTIONS, ...defaultOptions };
  }

  /**
   * @internal
   * @ignore
   */
  public getFileSize(file: ESFileListFile): string {
    const { labelKB, labelMB } = this.locale;
    const sizeKB = file.size / 1024;
    const sizeMB = file.size / 1024 / 1024;
    return sizeKB < 1024 ? `${sizeKB.toFixed(1)} ${labelKB}` : `${sizeMB.toFixed(1)} ${labelMB}`;
  }

  /**
   * @internal
   * @ignore
   */
  public removeFile(file: ESFileListRemoveAction): void {
    this.remove.emit(file);
  }

  /**
   * @internal
   * @ignore
   */
  public downloadFile(file: ESFileListFile): void {
    this.download.emit(file);
  }
}
