import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ESImageCarouselComponent } from './image-carousel.component';
import { ImageDialogModule } from '../custom-dialog/image-dialog/image-dialog.module';
import { CustomDialogService } from '../custom-dialog';

@NgModule({
  declarations: [ESImageCarouselComponent],
  imports: [CommonModule, MatIconModule, ImageDialogModule],
  exports: [ESImageCarouselComponent],
  providers: [CustomDialogService]
})
export class ESImageCarouselModule {}
