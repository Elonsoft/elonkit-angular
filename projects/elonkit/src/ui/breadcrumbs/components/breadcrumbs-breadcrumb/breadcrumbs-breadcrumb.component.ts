import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'es-breadcrumbs-breadcrumb',
  templateUrl: './breadcrumbs-breadcrumb.component.html',
  styleUrls: ['./breadcrumbs-breadcrumb.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsBreadcrumbComponent {
  /**
   * @internal
   */
  @Input() breadcrumb;

  /**
   * @internal
   */
  @Input() last = false;
}
