import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragAndDropStoryBasicComponent } from './drag-and-drop-story-basic.component';

import { ESDragAndDropModule } from '../..';

@NgModule({
  declarations: [DragAndDropStoryBasicComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    ESDragAndDropModule
  ],
  exports: [DragAndDropStoryBasicComponent]
})
export class DragAndDropStoryBasicModule {}
