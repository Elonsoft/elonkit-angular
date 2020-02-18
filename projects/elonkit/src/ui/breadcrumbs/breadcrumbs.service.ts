import { Injectable, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

import { IBreadcrumb } from './breadcrumbs.types';

@Injectable({ providedIn: 'root' })
export class ESBreadcrumbsService implements OnDestroy {
  breadcrumbs$ = new BehaviorSubject<IBreadcrumb[]>([]);
  destroyed$ = new Subject();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.getBreadcrumbs();

    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.getBreadcrumbs();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  private getBreadcrumbs() {
    const breadcrumbs = [];

    let route = this.activatedRoute;
    while (route) {
      if (
        (route.routeConfig?.resolve?.breadcrumb || route.routeConfig?.data?.breadcrumb) &&
        route.snapshot.data.breadcrumb
      ) {
        breadcrumbs.push({
          path: this.getPath(route),
          parentPath: this.getPath(route.parent),
          data: route.snapshot.data.breadcrumb
        });
      }
      route = route.firstChild;
    }

    this.breadcrumbs$.next(breadcrumbs);
  }

  private getPath(route: ActivatedRoute) {
    let path = '';

    while (route) {
      const segment = route.snapshot.url.map(s => s.path).join('/');
      if (segment) {
        path = `${segment}/${path}`;
      }
      route = route.parent;
    }

    return `/${path}`;
  }
}
