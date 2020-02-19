import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { IBreadcrumb } from '../../breadcrumbs.types';
import { ESBreadcrumbsLocale } from '../../breadcrumbs.component.locale';

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
  @Input() breadcrumb: IBreadcrumb;

  /**
   * @internal
   */
  @Input() last = false;

  constructor(
    /**
     * @internal
     */
    public locale: ESBreadcrumbsLocale
  ) {}
}
