import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ESBreadcrumbsResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    if (route.routeConfig && route.routeConfig.data && route.data.breadcrumbs) {
      return route.data.breadcrumbs;
    }
    return null;
  }
}
