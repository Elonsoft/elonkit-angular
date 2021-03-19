import { Injectable } from '@angular/core';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const ES_SVG_ICONS = {
  'es-empty-state': [
    'bell',
    'box',
    'cart',
    'chat',
    'face',
    'file',
    'filter',
    'lock',
    'search',
    'smile',
    'wi-fi',
    'wi-fi-off'
  ] as const
};

@Injectable()
export class ESIconsService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  /**
   * Add svg icons by resource url.
   * @param overrides Path mapping to icons to use instead of built-in ones.
   */
  public register(
    overrides?: {
      [component in keyof typeof ES_SVG_ICONS]?: {
        [icon in typeof ES_SVG_ICONS[component][number]]?: string;
      };
    }
  ) {
    Object.keys(ES_SVG_ICONS).forEach((component) => {
      ES_SVG_ICONS[component].forEach((icon) => {
        this.matIconRegistry.addSvgIconInNamespace(
          `${component}`,
          `${icon}`,
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            overrides?.[component]?.[icon] || `./assets/elonkit/${component}/${icon}.svg`
          )
        );
      });
    });
  }
}
