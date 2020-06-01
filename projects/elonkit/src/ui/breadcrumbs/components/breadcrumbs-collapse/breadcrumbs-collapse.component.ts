import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { ESBreadcrumb } from '../../breadcrumbs.types';
import { ESBreadcrumbsLocale } from '../../breadcrumbs.component.locale';

@Component({
  selector: 'es-breadcrumbs-collapse',
  templateUrl: './breadcrumbs-collapse.component.html',
  styleUrls: ['./breadcrumbs-collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsCollapseComponent {
  /**
   * @internal
   */
  @Input() breadcrumbs: ESBreadcrumb[];

  /**
   * @internal
   */
  @Input() moreTemplate: any;

  constructor(
    /**
     * @internal
     */
    public locale: ESBreadcrumbsLocale
  ) {}
}
