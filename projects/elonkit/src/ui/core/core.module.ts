import { NgModule } from '@angular/core';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule]
})
export class ESCoreModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    const assets = {
      'empty-state': ['box', 'chat', 'face', 'file', 'lock', 'search']
    };

    Object.keys(assets).forEach(component => {
      assets[component].forEach(icon => {
        this.matIconRegistry.addSvgIconInNamespace(
          `es-${component}`,
          `${icon}`,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            `./assets/elonkit/empty-state/${icon}.svg`
          )
        );
      });
    });
  }
}
