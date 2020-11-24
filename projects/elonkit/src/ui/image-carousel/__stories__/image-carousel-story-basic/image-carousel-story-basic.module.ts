import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCarouselStoryBasicComponent } from './image-carousel-story-basic.component';
import { ESImageCarouselModule } from '../../image-carousel.module';

@NgModule({
  declarations: [ImageCarouselStoryBasicComponent],
  imports: [CommonModule, ESImageCarouselModule],
  exports: [ImageCarouselStoryBasicComponent]
})
export class ImageCarouselStoryBasicModule {}
