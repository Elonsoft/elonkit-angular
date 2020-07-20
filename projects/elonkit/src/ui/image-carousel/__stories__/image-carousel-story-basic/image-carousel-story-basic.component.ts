import { Component, OnInit } from '@angular/core';
import { ESImageCarouselFile } from '../../image-carousel.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-image-carousel-basic',
  templateUrl: './image-carousel-story-basic.component.html'
})
export class ImageCarouselStoryBasicComponent implements OnInit {
  public files: ESImageCarouselFile[] = filesFixture;

  ngOnInit() {}
}
