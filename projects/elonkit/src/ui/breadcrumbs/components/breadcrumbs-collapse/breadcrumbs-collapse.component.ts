import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'es-breadcrumbs-collapse',
  templateUrl: './breadcrumbs-collapse.component.html',
  styleUrls: ['./breadcrumbs-collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsCollapseComponent {
  @Input() breadcrumbs;
}
