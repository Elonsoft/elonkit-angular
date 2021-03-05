export interface ESBreadcrumbData {
  icon?: string;
  svgIcon?: string;
  label?: string;
  ariaLabel?: string;
  ariaLabelBack?: string;
  breadcrumbs?: Array<{
    path: string | number;
    icon?: string;
    svgIcon?: string;
    label?: string;
    ariaLabel?: string;
  }>;
}

export interface ESBreadcrumb {
  path: string;
  parentPath: string;
  data: ESBreadcrumbData;
  withBackButton: boolean;
}
