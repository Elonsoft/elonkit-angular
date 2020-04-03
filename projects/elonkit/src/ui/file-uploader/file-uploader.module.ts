import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESFileUploaderComponent } from './file-uploader.component';
import { ESFileUploaderDropzoneComponent } from './components/file-uploader-dropzone';

@NgModule({
  declarations: [ESFileUploaderComponent, ESFileUploaderDropzoneComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESFileUploaderComponent]
})
export class ESFileUploaderModule {}
