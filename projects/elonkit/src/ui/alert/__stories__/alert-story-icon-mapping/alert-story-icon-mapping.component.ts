import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-alert-story-icon-mapping',
  template: `
    <es-alert variant="default" icon="new_releases">Message</es-alert>
    <br />
    <es-alert variant="info" svgIcon="warning">Message</es-alert>
    <br />
    <es-alert variant="success">Message</es-alert>
    <br />
    <es-alert variant="warning">Message</es-alert>
    <br />
    <es-alert variant="error">Message</es-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertStoryIconMappingComponent {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'warning',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/alert/warning.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'error',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/alert/error.svg')
    );
  }
}
