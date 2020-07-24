import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ESFileListFile } from '../../file-list.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-file-list-typography',
  templateUrl: './file-list-story-typography.component.html',
  styleUrls: ['./file-list-story-typography.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FileListStoryTypographyComponent {
  public files: ESFileListFile[] = filesFixture;
}
