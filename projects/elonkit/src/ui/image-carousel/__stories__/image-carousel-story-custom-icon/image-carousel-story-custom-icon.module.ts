import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCarouselStoryCustomIconComponent } from './image-carousel-story-custom-icon.component';
import { ESImageCarouselModule } from '../../image-carousel.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ImageCarouselStoryCustomIconComponent],
  imports: [CommonModule, ESImageCarouselModule, HttpClientModule],
  exports: [ImageCarouselStoryCustomIconComponent]
})
export class ImageCarouselStoryCustomIconModule {}
