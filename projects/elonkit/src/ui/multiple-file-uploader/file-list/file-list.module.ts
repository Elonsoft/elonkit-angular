import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESFileListComponent } from './file-list.component';
import { ESFileDownloadService } from '../file-download.service';

@NgModule({
  declarations: [ESFileListComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESFileListComponent],
  providers: [ESFileDownloadService]
})
export class ESFileListModule {}
