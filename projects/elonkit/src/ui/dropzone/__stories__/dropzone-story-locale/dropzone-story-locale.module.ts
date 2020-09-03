import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryLocaleComponent } from './dropzone-story-locale.component';

import { ESDropzoneModule } from '../..';

@NgModule({
  declarations: [DropzoneStoryLocaleComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ESDropzoneModule
  ],
  exports: [DropzoneStoryLocaleComponent]
})
export class DropzoneStoryLocaleModule {}
