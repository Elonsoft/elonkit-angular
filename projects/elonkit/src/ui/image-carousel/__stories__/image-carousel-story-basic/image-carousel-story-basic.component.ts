import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ESImageCarouselFile } from '../../image-carousel.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-image-carousel-basic',
  templateUrl: './image-carousel-story-basic.component.html',
  styleUrls: ['./image-carousel-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselStoryBasicComponent {
  @Input()
  public imageHeight: number;
  @Input()
  public imageWidth: number;
  @Input()
  public gap: number;
  @Input()
  public canView: boolean;
  @Input()
  public canRemove: boolean;
  @Input()
  public imageTypes: string;

  public files: ESImageCarouselFile[] = filesFixture;
}
