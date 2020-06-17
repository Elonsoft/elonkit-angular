import { Component, EventEmitter, ChangeDetectionStrategy, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { IESMultipleUploaderRemoveAction } from '../../multiple-file-uploader.types';

@Component({
  selector: 'es-multiple-file-uploader-locale',
  templateUrl: './multiple-file-uploader-story-locale.component.html',
  styleUrls: ['./multiple-file-uploader-story-locale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleFileUploaderStoryLocaleComponent {
  @Output()
  public removeFile: EventEmitter<IESMultipleUploaderRemoveAction> = new EventEmitter();

  public form = new FormGroup({
    docs: new FormControl([])
  });
  private icons = [
    { name: 'upload', url: '/icons/upload.svg' },
    { name: 'doc', url: '/icons/doc.svg' }
  ];

  constructor(private iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.icons.forEach(icon => {
      iconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    });
  }

  public onRemoveFile(data: IESMultipleUploaderRemoveAction): void {
    this.removeFile.emit(data);
  }
}
