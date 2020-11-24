import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ESImageCarouselComponent } from './image-carousel.component';

@NgModule({
  declarations: [ESImageCarouselComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule],
  exports: [ESImageCarouselComponent]
})
export class ESImageCarouselModule {}
