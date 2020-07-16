import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-locale',
  templateUrl: './file-list-story-locale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryLocaleComponent {
  public files: ESFileListFile[] = filesFixture;

  private icons = [
    {
      name: 'file',
      url: '/icons/file.svg'
    },
    {
      name: 'file_download',
      url: '/icons/file_download.svg'
    }
  ];

  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.icons.forEach(icon => {
      matIconRegistry.addSvgIcon(icon.name, sanitizer.bypassSecurityTrustResourceUrl(icon.url));
    });
  }
}
