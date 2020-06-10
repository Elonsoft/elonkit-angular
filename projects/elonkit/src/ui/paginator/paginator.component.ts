import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

@Component({
  selector: 'es-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESPaginatorComponent {
  @Input() count: number;

  // tslint:disable-next-line
  private _page: number;

  @Input()
  set page(page: number) {
    this.pageGoTo = '';
    this._page = page;
  }
  get page() {
    return this._page;
  }

  @Input() pageSize: number;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 50, 100, 250, 500];

  @Input() siblingCount = 2;
  @Input() boundaryCount = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageGoTo = '';

  get countStart() {
    return (this.page - 1) * this.pageSize + (this.count ? 1 : 0);
  }

  get countEnd() {
    return Math.min(this.page * this.pageSize, this.count);
  }

  get pagesCount() {
    return Math.ceil(this.count / this.pageSize);
  }

  get pages() {
    const startPages = range(1, Math.min(this.boundaryCount, this.pagesCount));
    const endPages = range(
      Math.max(this.pagesCount - this.boundaryCount + 1, this.boundaryCount + 1),
      this.pagesCount
    );

    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        this.page - this.siblingCount,
        // Lower boundary when page is high
        this.pagesCount - this.boundaryCount - this.siblingCount * 2 - 1
      ),
      // Greater than startPages
      this.boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        this.page + this.siblingCount,
        // Upper boundary when page is low
        this.boundaryCount + this.siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages[0] - 2
    );

    const itemList = [
      ...startPages,

      // Start ellipsis
      ...(siblingsStart > this.boundaryCount + 2
        ? [null]
        : this.boundaryCount + 1 < this.pagesCount - this.boundaryCount
        ? [this.boundaryCount + 1]
        : []),

      // Sibling pages
      ...range(siblingsStart, siblingsEnd),

      // End ellipsis
      ...(siblingsEnd < this.pagesCount - this.boundaryCount - 1
        ? [null]
        : this.pagesCount - this.boundaryCount > this.boundaryCount
        ? [this.pagesCount - this.boundaryCount]
        : []),

      ...endPages
    ];

    return itemList;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }

  onPageClick(page: number) {
    this.pageChange.emit(page);
  }

  onNextPage() {
    this.pageChange.emit(Math.min(this.page + 1, this.pagesCount));
  }

  onPrevPage() {
    this.pageChange.emit(Math.max(1, this.page - 1));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.pageGoTo) {
      const page = Math.max(1, Math.min(+this.pageGoTo, this.pagesCount));
      this.pageChange.emit(page);
    }
  }
}
