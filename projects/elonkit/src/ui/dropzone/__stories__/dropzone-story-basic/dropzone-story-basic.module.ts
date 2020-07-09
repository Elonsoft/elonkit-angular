import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryBasicComponent } from './dropzone-story-basic.component';

import { ESDropzoneModule } from '../..';

@NgModule({
  declarations: [DropzoneStoryBasicComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ESDropzoneModule
  ],
  exports: [DropzoneStoryBasicComponent]
})
export class DropzoneStoryBasicModule {}
