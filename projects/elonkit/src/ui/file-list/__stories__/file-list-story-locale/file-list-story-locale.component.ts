import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-locale',
  templateUrl: './file-list-story-locale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryLocaleComponent {
  public files: ESFileListFile[] = filesFixture;
}
