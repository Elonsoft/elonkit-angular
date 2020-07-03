import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragAndDropStoryRequiredComponent } from './drag-and-drop-story-required.component';
import { ESDragAndDropModule } from '../..';

@NgModule({
  declarations: [DragAndDropStoryRequiredComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    ESDragAndDropModule
  ],
  exports: [DragAndDropStoryRequiredComponent]
})
export class DragAndDropStoryRequiredModule {}
