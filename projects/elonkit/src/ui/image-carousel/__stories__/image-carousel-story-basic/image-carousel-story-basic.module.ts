import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCarouselStoryBasicComponent } from './image-carousel-story-basic.component';
import { ESImageCarouselModule } from '../../image-carousel.module';
import { HttpClientModule } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [ImageCarouselStoryBasicComponent],
  imports: [CommonModule, OverlayModule, ESImageCarouselModule],
  exports: [ImageCarouselStoryBasicComponent]
})
export class ImageCarouselStoryBasicModule {}
