import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'es-breadcrumbs-basic',
  templateUrl: './breadcrumbs-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Hack for RouterTestingModule
    this.router.navigate(['/']);
  }

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
