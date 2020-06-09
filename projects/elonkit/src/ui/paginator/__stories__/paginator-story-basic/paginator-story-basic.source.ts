export const PAGINATOR_STORY_BASIC_SOURCE = {
  html: `
  <es-paginator
    [count]="count"
    [page]="page"
    [pageSize]="pageSize"
    (pageChange)="onPageChange($event)"
    (pageSizeChange)="onPageSizeChange($event)"
  ></es-paginator>
  `
};
