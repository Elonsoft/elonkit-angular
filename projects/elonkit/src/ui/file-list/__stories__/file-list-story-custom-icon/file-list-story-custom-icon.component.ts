import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-custom-icon',
  templateUrl: './file-list-story-custom-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryCustomIconComponent {
  public files: ESFileListFile[] = filesFixture;
  public customIcon = '/icons/file-list/file.svg';
}
