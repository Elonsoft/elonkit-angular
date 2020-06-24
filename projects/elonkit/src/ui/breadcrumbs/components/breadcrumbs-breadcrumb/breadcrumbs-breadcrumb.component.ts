import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { ESBreadcrumb } from '../../breadcrumbs.types';
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
  @Input() breadcrumb: ESBreadcrumb;

  /**
   * @internal
   */
  @Input() last = false;

  /**
   * @internal
   */
  @Input() typography: string;

  constructor(
    /**
     * @internal
     */
    public locale: ESBreadcrumbsLocale
  ) {}
}