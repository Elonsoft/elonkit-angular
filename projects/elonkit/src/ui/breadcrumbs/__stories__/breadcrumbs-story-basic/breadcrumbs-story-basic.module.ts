import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { BreadcrumbsStoryBasicComponent } from './breadcrumbs-story-basic.component';
import { PostsResolver, PostsBreadcrumbsResolver } from './breadcrumbs-story-basic.resolver';
import { PostsService } from './breadcrumbs-story-basic.service';

import { ESBreadcrumbsModule, ESBreadcrumbsComponent, ESBreadcrumbsResolver } from '../..';

const ROUTES = [
  {
    path: '',
    data: {
      breadcrumbs: 'Home'
    },
    resolve: { breadcrumbs: ESBreadcrumbsResolver },
    children: [
      {
        path: 'posts',
        data: {
          breadcrumbs: 'Posts'
        },
        resolve: { breadcrumbs: ESBreadcrumbsResolver },
        children: [
          {
            path: '',
            component: ESBreadcrumbsComponent
          },
          {
            path: ':id',
            resolve: {
              data: PostsResolver
            },
            children: [
              {
                path: '',
                component: ESBreadcrumbsComponent,
                resolve: {
                  breadcrumbs: PostsBreadcrumbsResolver
                }
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [BreadcrumbsStoryBasicComponent],
  imports: [CommonModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
  exports: [BreadcrumbsStoryBasicComponent],
  providers: [PostsResolver, PostsBreadcrumbsResolver, PostsService]
})
export class BreadcrumbsStoryBasicModule {}
