import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'es-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESBreadcrumbsComponent implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  breadcrumbs: Array<{ path: string; text: string }> = [];

  constructor(private changeDetector: ChangeDetectorRef, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      const breadcrumbs = [];

      let route = this.activatedRoute;
      while (route) {
        if (
          route.routeConfig &&
          route.routeConfig.resolve &&
          route.routeConfig.resolve.breadcrumbs
        ) {
          breadcrumbs.unshift({
            path: this.getPath(route),
            text: route.snapshot.data.breadcrumbs
          });
        }
        route = route.parent;
      }

      this.breadcrumbs = breadcrumbs;
      this.changeDetector.detectChanges();
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
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
