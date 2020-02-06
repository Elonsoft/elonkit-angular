import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { PostsService } from './breadcrumbs-story-basic.service';

@Injectable()
export class PostsResolver implements Resolve<any> {
  constructor(private postsService: PostsService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.postsService.getOne(+route.params.id);
  }
}

@Injectable()
export class PostsBreadcrumbsResolver implements Resolve<any> {
  resolve(route: ActivatedRouteSnapshot) {
    return { text: route.parent.data.data.title };
  }
}
