import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-custom-icon',
  templateUrl: './file-list-story-custom-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListStoryCustomIconComponent {
  @Input()
  public canRemove: boolean;
  @Input()
  public canDownload: boolean;
  @Input()
  public hideImages: boolean;
  @Input()
  public imageTypes: string;

  public files: ESFileListFile[] = filesFixture;
  public customIcon = '/icons/file-list/file.svg';
}
