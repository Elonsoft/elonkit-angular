import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'es-breadcrumbs-basic',
  templateUrl: './breadcrumbs-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicComponent {
  constructor(private router: Router) {}

  get path() {
    return this.router.url;
  }
}

@Component({
  selector: 'es-breadcrumbs-basic-placeholder',
  template: `
    <p></p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicPlaceholderComponent {}
