import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'es-breadcrumbs-customization',
  template: `
    <es-breadcrumbs typography="mat-body-2">
      <mat-icon *esBreadcrumbsSeparator class="es-breadcrumbs__separator">
        double_arrow
      </mat-icon>
    </es-breadcrumbs>
    <br />
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryCustomizationComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Hack for RouterTestingModule
    this.router.navigate(['/categories/1/1/edit']);
  }
}
