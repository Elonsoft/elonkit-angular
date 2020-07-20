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
import { coerceBooleanProperty } from '@angular/cdk/coercion';

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
  /**
   * File types to be considered as image separated by a comma, e.g. `image/png,image/jpg,image/jpeg`.
   * Defaults to `image/*`
   */
  @Input()
  public get imageTypes(): string {
    return this._imageTypes;
  }
  public set imageTypes(value: string) {
    this._imageTypes = value ?? this.defaultOptions?.imageTypes ?? 'image/*';
  }
  private _imageTypes: string;

  /**
   * Defines whether component should render images in a list.
   */
  @Input()
  public get hideImages(): boolean {
    return this._hideImages;
  }
  public set hideImages(value: boolean) {
    this._hideImages = coerceBooleanProperty(value);
  }
  private _hideImages: boolean;

  /**
   * Defines whether remove buttons should be rendered for files.
   */
  @Input()
  public get canRemove(): boolean {
    return this._canRemove;
  }
  public set canRemove(value: boolean) {
    this._canRemove = coerceBooleanProperty(value);
  }
  private _canRemove: boolean;

  /**
   * Defines whether download file icon should be rendered for files.
   */
  @Input()
  public get canDownload(): boolean {
    return this._canDownload;
  }
  public set canDownload(value: boolean) {
    this._canDownload = coerceBooleanProperty(value);
  }
  private _canDownload: boolean;

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

  /**
   * @internal
   * @ignore
   */
  constructor(
    public locale: ESFileListLocale,
    @Optional()
    @Inject(ES_FILE_LIST_DEFAULT_OPTIONS)
    private defaultOptions: ESFileListOptions
  ) {
    this.imageTypes = this.defaultOptions?.imageTypes;
    this.hideImages = this.defaultOptions?.hideImages;
    this.canDownload = this.defaultOptions?.canDownload;
    this.canRemove = this.defaultOptions?.canRemove;
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
  public fileTypeValid(file: ESFileListFile): boolean {
    return validateFileType(file, this.imageTypes);
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
