import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'es-alert-story-icon-mapping',
  template: `
    <es-alert variant="default" icon="new_releases" [closable]="closable" (closed)="onClose()">
      {{ content }}
    </es-alert>
    <br />
    <es-alert variant="info" svgIcon="warning" [closable]="closable" (closed)="onClose()">
      {{ content }}
    </es-alert>
    <br />
    <es-alert variant="success" [closable]="closable" (closed)="onClose()">{{ content }}</es-alert>
    <br />
    <es-alert variant="warning" [closable]="closable" (closed)="onClose()">{{ content }}</es-alert>
    <br />
    <es-alert variant="error" [closable]="closable" (closed)="onClose()">{{ content }}</es-alert>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertStoryIconMappingComponent {
  @Input() public content: string;
  @Input() public closable: boolean;

  @Output() public closed = new EventEmitter();

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

  public onClose() {
    this.closed.emit();
  }
}
