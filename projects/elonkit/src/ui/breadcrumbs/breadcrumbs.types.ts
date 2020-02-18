export interface IBreadcrumb {
  path: string;
  parentPath: string;
  data: {
    icon?: string;
    label?: string;
    breadcrumbs?: Array<{
      path: string | number;
      icon?: string;
      label?: string;
    }>;
  };
}
