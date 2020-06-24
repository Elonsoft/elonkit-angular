import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-basic',
  templateUrl: './file-list-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryBasicComponent {
  @Input()
  public canRemove: boolean;
  @Input()
  public canDownload: boolean;
  @Input()
  public hideImages: boolean;

  public files: ESFileListFile[] = filesFixture;

  private icons = [
    {
      name: 'doc',
      url: '/icons/doc.svg'
    },
    {
      name: 'doc_download',
      url: '/icons/doc_download.svg'
    }
  ];

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.icons.forEach(icon => {
      matIconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    });
  }
}
