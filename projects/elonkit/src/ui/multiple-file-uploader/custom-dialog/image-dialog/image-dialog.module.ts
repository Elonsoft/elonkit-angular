import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ImageDialogComponent } from './image-dialog.component';

@NgModule({
  declarations: [ImageDialogComponent],
  imports: [CommonModule, MatProgressSpinnerModule, MatButtonModule, MatIconModule],
  exports: [ImageDialogComponent],
  entryComponents: [ImageDialogComponent]
})
export class ImageDialogModule {}
