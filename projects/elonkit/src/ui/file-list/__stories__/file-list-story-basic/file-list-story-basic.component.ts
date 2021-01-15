import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

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
  @Input()
  public imageTypes: string;

  public files: ESFileListFile[] = filesFixture;
}
