import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageCarouselStoryLocaleComponent } from './image-carousel-story-locale.component';
import { ESImageCarouselModule } from '../../image-carousel.module';
import {
  ESImageCarouselLocale,
  ESImageCarouselLocaleRU
} from '../../image-carousel.component.locale';

@NgModule({
  declarations: [ImageCarouselStoryLocaleComponent],
  imports: [CommonModule, ESImageCarouselModule],
  exports: [ImageCarouselStoryLocaleComponent],
  providers: [{ provide: ESImageCarouselLocale, useClass: ESImageCarouselLocaleRU }]
})
export class ImageCarouselStoryLocaleModule {}
