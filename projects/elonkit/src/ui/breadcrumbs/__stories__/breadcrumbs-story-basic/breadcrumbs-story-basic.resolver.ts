import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CategoriesService, ItemsService } from './breadcrumbs-story-basic.service';

@Injectable()
export class CategoriesListResolver implements Resolve<any> {
  constructor(private categoriesService: CategoriesService) {}

  public resolve() {
    return this.categoriesService.getAll();
  }
}

@Injectable()
export class CategoriesShowResolver implements Resolve<any> {
  constructor(private categoriesService: CategoriesService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.categoriesService.getOne(+route.params.item);
  }
}

@Injectable()
export class CategoriesShowBreadcrumbsResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot) {
    const category = route.parent.data.data.find((e) => e.id === +route.params.category);

    return {
      label: category.title,
      breadcrumbs: route.parent.data.data.map(({ id, title }) => ({
        path: id,
        label: title
      }))
    };
  }
}

@Injectable()
export class ItemsListResolver implements Resolve<any> {
  constructor(private itemsService: ItemsService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.itemsService.getAll(+route.params.category);
  }
}

@Injectable()
export class ItemsShowResolver implements Resolve<any> {
  constructor(private itemsService: ItemsService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.itemsService.getOne(+route.params.item);
  }
}

@Injectable()
export class ItemsShowBreadcrumbsResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot) {
    return { label: route.parent.data.data.title };
  }
}
