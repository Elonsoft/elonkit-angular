export const BREADCRUMBS_STORY_CUSTOMIZATION_SOURCE = {
  ts: `
  import { ES_BREADCRUMBS_DEFAULT_SIZES } from '@elonsoft/elonkit/ui/breadcrumbs';

  ...

  public sizes = {
    ...ES_BREADCRUMBS_DEFAULT_SIZES,
    separator: 24
  };
  `,
  html: `
  <es-breadcrumbs typography="mat-body-2" [sizes]="sizes" [withBackButton]="withBackButton">
    <mat-icon *esBreadcrumbsSeparator class="es-breadcrumbs__separator">
      chevron_right
    </mat-icon>
    <mat-icon *esBreadcrumbsMore>
      more_horiz
    </mat-icon>
  </es-breadcrumbs>
  `,
  scss: `
  .es-breadcrumbs__separator {
    margin: 0;
  }
  `
};
