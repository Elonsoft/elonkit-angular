import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ESFileListFile } from '../../file-list.types';

@Component({
  selector: 'es-file-list-locale',
  templateUrl: './file-list-story-locale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryLocaleComponent {
  public files: ESFileListFile[] = [
    {
      id: 1,
      type: 'image',
      file: 'https://dummyimage.com/400x400/405ed6/fff.jpg&text=ES',
      name: 'FileName1.jpg',
      size: 45678,
      content: null
    },
    {
      id: 2,
      type: 'image',
      file: 'https://dummyimage.com/400x400/228a0f/fff.jpg&text=ES',
      name: 'FileName2.jpg',
      size: 456789,
      content: null
    },
    {
      id: 3,
      type: 'application/pdf',
      file: 'https://dummyimage.com/400x400/d6761c/fff.jpg&text=ES',
      name: 'FileName3.pdf',
      size: 4567,
      content: null
    },
    {
      id: 4,
      type: 'image',
      file: 'https://dummyimage.com/400x400/2dbdb8/fff.jpg&text=ES',
      name: 'FileName4.jpg',
      size: 456,
      content: null
    }
  ];

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
