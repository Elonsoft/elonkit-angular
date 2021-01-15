import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'es-tag-story-svg-icon',
  template: `<es-tag svgIcon="warning">{{ content }}</es-tag>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagStorySvgIconComponent {
  @Input()
  public content: string;

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/alert/warning.svg')
    );
  }
}
