import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { RouterTestingModule } from '@angular/router/testing';

import {
  BreadcrumbsStoryBasicComponent,
  BreadcrumbsStoryBasicPlaceholderComponent
} from './breadcrumbs-story-basic.component';
import { CategoriesService, ItemsService } from './breadcrumbs-story-basic.service';

import {
  HomeBreadcrumbsResolver,
  CategoriesListResolver,
  CategoriesShowResolver,
  CategoriesShowBreadcrumbsResolver,
  ItemsResolver,
  ItemsBreadcrumbsResolver
} from './breadcrumbs-story-basic.resolver';

import { ESBreadcrumbsModule, ESBreadcrumbsResolver } from '../..';

const ROUTES = [
  {
    path: '',
    data: {
      breadcrumbs: { icon: 'home' }
    },
    resolve: {
      breadcrumbs: ESBreadcrumbsResolver
    },
    children: [
      {
        path: 'categories',
        data: {
          breadcrumbs: { text: 'Categories' }
        },
        resolve: {
          data: CategoriesListResolver, // We need to move list resolver one level up in order to use horizontal navigation.
          breadcrumbs: ESBreadcrumbsResolver
        },
        children: [
          {
            path: '',
            component: BreadcrumbsStoryBasicPlaceholderComponent
          },
          {
            path: ':category',
            resolve: {
              data: CategoriesShowResolver,
              breadcrumbs: CategoriesShowBreadcrumbsResolver
            },
            children: [
              {
                path: '',
                component: BreadcrumbsStoryBasicPlaceholderComponent
              },
              {
                path: ':item',
                resolve: {
                  data: ItemsResolver
                },
                children: [
                  {
                    path: '',
                    resolve: {
                      breadcrumbs: ItemsBreadcrumbsResolver
                    },
                    children: [
                      {
                        path: '',
                        component: BreadcrumbsStoryBasicPlaceholderComponent
                      },
                      {
                        path: 'edit',
                        component: BreadcrumbsStoryBasicPlaceholderComponent,
                        data: {
                          breadcrumbs: { text: 'Edit' }
                        },
                        resolve: {
                          breadcrumbs: ESBreadcrumbsResolver
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [BreadcrumbsStoryBasicComponent, BreadcrumbsStoryBasicPlaceholderComponent],
  imports: [CommonModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
  exports: [BreadcrumbsStoryBasicComponent],
  providers: [
    CategoriesService,
    ItemsService,
    HomeBreadcrumbsResolver,
    CategoriesListResolver,
    CategoriesShowResolver,
    CategoriesShowBreadcrumbsResolver,
    ItemsResolver,
    ItemsBreadcrumbsResolver,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class BreadcrumbsStoryBasicModule {}
