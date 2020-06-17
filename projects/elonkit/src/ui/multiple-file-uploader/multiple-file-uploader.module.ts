import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ESFileListModule } from './file-list/file-list.module';
import { ESImageScrollerModule } from './image-scroller/image-scroller.module';
import { ESMultipleFileUploaderComponent } from './multiple-file-uploader.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ESMultipleFileUploaderComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ESFileListModule,
    ESImageScrollerModule,
    HttpClientModule
  ],
  exports: [ESMultipleFileUploaderComponent]
})
export class ESMultipleFileUploaderModule {}
