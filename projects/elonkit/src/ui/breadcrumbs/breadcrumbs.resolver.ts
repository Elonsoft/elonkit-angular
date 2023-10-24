import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class ESBreadcrumbsResolver {
  public resolve(route: ActivatedRouteSnapshot) {
    if (route.routeConfig && route.routeConfig.data && route.data.breadcrumb) {
      return route.data.breadcrumb;
    }
    return null;
  }
}
