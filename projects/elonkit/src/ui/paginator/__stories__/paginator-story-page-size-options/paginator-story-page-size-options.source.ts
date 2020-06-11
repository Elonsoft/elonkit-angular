export const PAGINATOR_STORY_PAGE_SIZE_OPTIONS_SOURCE = {
  html: `
  <es-paginator
    [count]="count"
    [page]="page"
    [pageSize]="pageSize"
    [pageSizeOptions]="[5, 6, 7, 8, 9, 10]"
    (pageChange)="onPageChange($event)"
    (pageSizeChange)="onPageSizeChange($event)"
  ></es-paginator>
  `
};
