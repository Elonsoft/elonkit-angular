export const PAGINATOR_STORY_BASIC_SOURCE = {
  ts: `
  @Component({
    ...
  })
  export class PaginatableDataComponent {
    count = 100;

    page = 1;
    pageSize = 5;

    onPageChange(page: number) {
      this.page = page;
    }

    onPageSizeChange(pageSize: number) {
      this.pageSize = pageSize;
      this.page = 1;
    }
  }
  `,
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
