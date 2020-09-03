import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';

import { Observable } from 'rxjs';

import { ESBreadcrumb } from '../../breadcrumbs.types';
import { ESLocaleService, ESLocale } from '../../../locale';

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
  @Input() public breadcrumbs: ESBreadcrumb[];

  /**
   * @internal
   */
  @Input() public moreTemplate: any;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  constructor(
    /**
     * @internal
     */
    public localeService: ESLocaleService
  ) {
    this.locale$ = this.localeService.locale();
  }
}
