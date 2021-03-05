export const BREADCRUMBS_STORY_BASIC_SOURCE = {
  html: `
  <es-breadcrumbs [withBackButton]="withBackButton"></es-breadcrumbs>
  `,
  ts: `
  import { ESBreadcrumbsModule, ESBreadcrumbsResolver } from '@elonsoft/elonkit/ui/breadcrumbs';

  const ROUTES = [
    {
      path: '',
      data: {
        breadcrumb: { icon: 'home', ariaLabel: 'Home' },
      },
      resolve: {
        breadcrumb: ESBreadcrumbsResolver
      },
      children: [
        {
          path: '',
          component: HomeComponent
        },
        {
          path: 'categories',
          data: {
            breadcrumb: { label: 'Caption' }
          },
          resolve: {
            data: CategoriesListResolver, // We need to move list resolver one level up in order to use horizontal navigation.
            breadcrumb: ESBreadcrumbsResolver
          },
          children: [
            {
              path: '',
              component: CategoriesListComponent
            },
            {
              path: ':category',
              resolve: {
                data: CategoriesShowResolver,
                breadcrumb: CategoriesShowBreadcrumbsResolver
              },
              children: [
                {
                  path: '',
                  component: ItemsListComponent,
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
                        breadcrumb: ItemsShowBreadcrumbsResolver
                      },
                      children: [
                        {
                          path: '',
                          component: ItemsShowComponent
                        },
                        {
                          path: 'edit',
                          component: ItemsEditComponent,
                          data: {
                            breadcrumb: { label: 'Edit' }
                          },
                          resolve: {
                            breadcrumb: ESBreadcrumbsResolver
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
    imports: [..., ESBreadcrumbsModule, RouterModule.forRoot(ROUTES)],
    ...
  })
  export class AppModule {}
  `
};
