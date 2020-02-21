import { Component, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { ES_BREADCRUMBS_DEFAULT_SIZES } from '../..';

@Component({
  selector: 'es-breadcrumbs-customization',
  template: `
    <div class="customization">
      <es-breadcrumbs typography="mat-caption" [sizes]="sizes">
        <mat-icon *esBreadcrumbsSeparator svgIcon="chevron_right" class="es-breadcrumbs__separator">
        </mat-icon>
        <mat-icon *esBreadcrumbsMore svgIcon="more_horiz"></mat-icon>
      </es-breadcrumbs>
      <br />
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./breadcrumbs-story-customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbsStoryCustomizationComponent implements OnInit {
  public sizes = {
    ...ES_BREADCRUMBS_DEFAULT_SIZES,
    separator: 24
  };

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'chevron_right',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/chevron_right.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/home.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'more_horiz',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/more_horiz.svg')
    );
  }

  ngOnInit() {
    // Hack for RouterTestingModule
    this.router.navigate(['/categories/1/1/edit']);
  }
}
