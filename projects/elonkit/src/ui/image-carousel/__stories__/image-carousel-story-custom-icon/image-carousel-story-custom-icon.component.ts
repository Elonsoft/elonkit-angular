import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

import { ESImageCarouselFile } from '../../image-carousel.types';
import { filesFixture } from '../../fixtures/files.fixture';

@Component({
  selector: 'es-image-carousel-custom-icon',
  templateUrl: './image-carousel-story-custom-icon.component.html',
  styleUrls: ['./image-carousel-story-custom-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageCarouselStoryCustomIconComponent {
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

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'magnify',
      sanitizer.bypassSecurityTrustResourceUrl('/icons/magnify.svg')
    );
  }
}
