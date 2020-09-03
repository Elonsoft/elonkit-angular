import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';

import { ESDropzoneComponent } from './dropzone.component';

@NgModule({
  declarations: [ESDropzoneComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatRippleModule, HttpClientModule],
  exports: [ESDropzoneComponent]
})
export class ESDropzoneModule {}
