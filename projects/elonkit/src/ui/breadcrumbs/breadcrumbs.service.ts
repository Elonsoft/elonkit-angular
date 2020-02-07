import { Injectable, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ESBreadcrumbsService implements OnDestroy {
  breadcrumbs$ = new BehaviorSubject<Array<{ path: string; text?: string; icon?: string }>>([]);
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
        (route.routeConfig?.resolve?.breadcrumbs || route.routeConfig?.data?.breadcrumbs) &&
        route.snapshot.data.breadcrumbs
      ) {
        breadcrumbs.push({
          path: this.getPath(route),
          parentPath: this.getPath(route.parent),
          data: route.snapshot.data.breadcrumbs
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
