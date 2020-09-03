import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { ESBreadcrumb } from './breadcrumbs.types';

@Injectable()
export class ESBreadcrumbsResolver implements Resolve<ESBreadcrumb> {
  public resolve(route: ActivatedRouteSnapshot) {
    if (route.routeConfig && route.routeConfig.data && route.data.breadcrumb) {
      return route.data.breadcrumb;
    }
    return null;
  }
}
