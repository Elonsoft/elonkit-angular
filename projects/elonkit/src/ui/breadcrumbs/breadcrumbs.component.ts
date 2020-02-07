import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

import { ESBreadcrumbsService } from './breadcrumbs.service';

@Component({
  selector: 'es-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsComponent {
  constructor(public breadcrumbsService: ESBreadcrumbsService) {}
}
