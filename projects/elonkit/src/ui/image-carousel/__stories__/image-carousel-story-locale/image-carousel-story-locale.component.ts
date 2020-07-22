import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ESImageCarouselFile } from '../../image-carousel.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-image-carousel-locale',
  templateUrl: './image-carousel-story-locale.component.html',
  styleUrls: ['./image-carousel-story-locale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselStoryLocaleComponent {
  public files: ESImageCarouselFile[] = filesFixture;
}
