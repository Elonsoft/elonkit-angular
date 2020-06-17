import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IMAGE_TYPES } from '../multiple-file-uploader.configs';
import { ESFileDownloadService } from '../file-download.service';
import { ESFileListLocale } from './file-list.component.locale';
import {
  IESMultipleUploaderFile,
  IESMultipleUploaderRemoveAction
} from '../multiple-file-uploader.types';

@Component({
  selector: 'es-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class ESFileListComponent {
  public IMAGE_TYPES = IMAGE_TYPES;

  @Input()
  public showImages = true;
  @Input()
  public canRemove = true;
  @Input()
  public canDownload = false;
  @Input()
  public files: IESMultipleUploaderFile[];

  @Output()
  public remove: EventEmitter<IESMultipleUploaderRemoveAction> = new EventEmitter();

  constructor(
    private locale: ESFileListLocale,
    private fileDownloadService: ESFileDownloadService
  ) {}

  public getFileSize(file: File): string {
    const { labelKB, labelMB } = this.locale;
    const sizeKB = file.size / 1024;
    const sizeMB = file.size / 1024 / 1024;
    if (sizeKB < 1024) {
      return `${sizeKB.toFixed(1)} ${labelKB}`;
    }

    return `${sizeMB.toFixed(1)} ${labelMB}`;
  }

  public removeFile(obj: { file: IESMultipleUploaderFile; index: number }) {
    this.remove.emit(obj);
  }

  public downloadFile(file: IESMultipleUploaderFile) {
    if (!file.file) {
      return;
    }
    this.fileDownloadService.saveAs(file.file, file.name).subscribe();
  }
}
