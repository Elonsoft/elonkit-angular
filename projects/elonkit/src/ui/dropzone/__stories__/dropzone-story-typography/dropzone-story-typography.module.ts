import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryTypographyComponent } from './dropzone-story-typography.component';
import { ESDropzoneModule } from '../..';

@NgModule({
  declarations: [DropzoneStoryTypographyComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ESDropzoneModule
  ],
  exports: [DropzoneStoryTypographyComponent]
})
export class DropzoneStoryTypographyModule {}
