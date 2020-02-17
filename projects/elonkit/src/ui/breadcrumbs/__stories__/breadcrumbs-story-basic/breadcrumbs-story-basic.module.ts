import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { RouterTestingModule } from '@angular/router/testing';

import {
  BreadcrumbsStoryBasicComponent,
  BreadcrumbsStoryBasicHomeComponent,
  BreadcrumbsStoryBasicCategoriesListComponent,
  BreadcrumbsStoryBasicItemsListComponent,
  BreadcrumbsStoryBasicItemsShowComponent,
  BreadcrumbsStoryBasicItemsEditComponent
} from './breadcrumbs-story-basic.component';

import { CategoriesService, ItemsService } from './breadcrumbs-story-basic.service';

import {
  CategoriesListResolver,
  CategoriesShowResolver,
  CategoriesShowBreadcrumbsResolver,
  ItemsListResolver,
  ItemsShowResolver,
  ItemsShowBreadcrumbsResolver
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
        path: '',
        component: BreadcrumbsStoryBasicHomeComponent
      },
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
            component: BreadcrumbsStoryBasicCategoriesListComponent
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
                component: BreadcrumbsStoryBasicItemsListComponent,
                resolve: {
                  data: ItemsListResolver
                }
              },
              {
                path: ':item',
                resolve: {
                  data: ItemsShowResolver
                },
                children: [
                  {
                    path: '',
                    resolve: {
                      breadcrumbs: ItemsShowBreadcrumbsResolver
                    },
                    children: [
                      {
                        path: '',
                        component: BreadcrumbsStoryBasicItemsShowComponent
                      },
                      {
                        path: 'edit',
                        component: BreadcrumbsStoryBasicItemsEditComponent,
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
  declarations: [
    BreadcrumbsStoryBasicComponent,
    BreadcrumbsStoryBasicHomeComponent,
    BreadcrumbsStoryBasicCategoriesListComponent,
    BreadcrumbsStoryBasicItemsListComponent,
    BreadcrumbsStoryBasicItemsShowComponent,
    BreadcrumbsStoryBasicItemsEditComponent
  ],
  imports: [CommonModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
  exports: [BreadcrumbsStoryBasicComponent],
  providers: [
    CategoriesService,
    ItemsService,
    CategoriesListResolver,
    CategoriesShowResolver,
    CategoriesShowBreadcrumbsResolver,
    ItemsListResolver,
    ItemsShowResolver,
    ItemsShowBreadcrumbsResolver,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})
export class BreadcrumbsStoryBasicModule {}
