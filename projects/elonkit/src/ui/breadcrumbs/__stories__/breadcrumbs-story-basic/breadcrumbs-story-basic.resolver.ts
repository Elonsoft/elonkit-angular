import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';

import { CategoriesService, ItemsService } from './breadcrumbs-story-basic.service';

@Injectable()
export class CategoriesListResolver {
  constructor(private categoriesService: CategoriesService) {}

  public resolve() {
    return this.categoriesService.getAll();
  }
}

@Injectable()
export class CategoriesShowResolver {
  constructor(private categoriesService: CategoriesService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.categoriesService.getOne(+route.params.item);
  }
}

@Injectable()
export class CategoriesShowBreadcrumbsResolver {
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
export class ItemsListResolver {
  constructor(private itemsService: ItemsService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.itemsService.getAll(+route.params.category);
  }
}

@Injectable()
export class ItemsShowResolver {
  constructor(private itemsService: ItemsService) {}

  public resolve(route: ActivatedRouteSnapshot) {
    return this.itemsService.getOne(+route.params.item);
  }
}

@Injectable()
export class ItemsShowBreadcrumbsResolver {
  public resolve(route: ActivatedRouteSnapshot) {
    return { label: route.parent.data.data.title };
  }
}
