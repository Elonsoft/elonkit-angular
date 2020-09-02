import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryCustomIconComponent } from './dropzone-story-custom-icon.component';
import { ESDropzoneModule } from '../..';

@NgModule({
  declarations: [DropzoneStoryCustomIconComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ESDropzoneModule
  ],
  exports: [DropzoneStoryCustomIconComponent]
})
export class DropzoneStoryCustomIconModule {}
