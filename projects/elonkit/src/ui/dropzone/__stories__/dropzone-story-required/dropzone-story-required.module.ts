import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryRequiredComponent } from './dropzone-story-required.component';
import { ESDropzoneModule } from '../..';

@NgModule({
  declarations: [DropzoneStoryRequiredComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    ESDropzoneModule
  ],
  exports: [DropzoneStoryRequiredComponent]
})
export class DropzoneStoryRequiredModule {}
