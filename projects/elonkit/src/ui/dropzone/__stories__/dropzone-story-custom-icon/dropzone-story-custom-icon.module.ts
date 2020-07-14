import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DropzoneStoryCustomIconComponent } from './dropzone-story-custom-icon.component';

import { ESDropzoneModule } from '../..';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

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
  exports: [DropzoneStoryCustomIconComponent],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3000 } }]
})
export class DropzoneStoryCustomIconModule {}
