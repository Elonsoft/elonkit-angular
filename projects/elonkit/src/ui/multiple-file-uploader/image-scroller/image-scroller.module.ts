import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ESImageScrollerComponent } from './image-scroller.component';
import { ImageDialogModule } from '../custom-dialog/image-dialog/image-dialog.module';
import { CustomDialogService } from '../custom-dialog';

@NgModule({
  declarations: [ESImageScrollerComponent],
  imports: [CommonModule, MatIconModule, ImageDialogModule],
  exports: [ESImageScrollerComponent],
  providers: [CustomDialogService]
})
export class ESImageScrollerModule {}
