export interface ESBreadcrumbData {
  icon?: string;
  svgIcon?: string;
  label?: string;
  breadcrumbs?: Array<{
    path: string | number;
    icon?: string;
    svgIcon?: string;
    label?: string;
  }>;
}

export interface ESBreadcrumb {
  path: string;
  parentPath: string;
  data: ESBreadcrumbData;
}
