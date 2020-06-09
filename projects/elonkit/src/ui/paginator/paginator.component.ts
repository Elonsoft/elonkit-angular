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
  @Input() count!: number;

  // tslint:disable-next-line
  private _page!: number;

  @Input()
  set page(page: number) {
    if (this._page !== page) {
      this.pageGoTo = '';
    }
    this._page = page;
  }
  get page() {
    return this._page;
  }

  @Input() pageSize!: number;
  @Input() siblingCount = 2;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  pageSizes = [5, 10, 25, 50, 100, 250, 500];
  pageGoTo = '';

  get countStart() {
    return this.page * this.pageSize + (this.count ? 1 : 0);
  }

  get countEnd() {
    return Math.min((this.page + 1) * this.pageSize, this.count);
  }

  get pagesCount() {
    return Math.ceil(this.count / this.pageSize);
  }

  get pages() {
    const naturalPage = this.page + 1;
    const boundaryCount = 1;

    const startPages = range(1, Math.min(boundaryCount, this.pagesCount));
    const endPages = range(
      Math.max(this.pagesCount - boundaryCount + 1, boundaryCount + 1),
      this.pagesCount
    );

    const siblingsStart = Math.max(
      Math.min(
        // Natural start
        naturalPage - this.siblingCount,
        // Lower boundary when page is high
        this.pagesCount - boundaryCount - this.siblingCount * 2 - 1
      ),
      // Greater than startPages
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        // Natural end
        naturalPage + this.siblingCount,
        // Upper boundary when page is low
        boundaryCount + this.siblingCount * 2 + 2
      ),
      // Less than endPages
      endPages[0] - 2
    );

    const itemList = [
      ...startPages,

      // Start ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsStart > boundaryCount + 2
        ? [null]
        : boundaryCount + 1 < this.pagesCount - boundaryCount
        ? [boundaryCount + 1]
        : []),

      // Sibling pages
      ...range(siblingsStart, siblingsEnd),

      // End ellipsis
      // eslint-disable-next-line no-nested-ternary
      ...(siblingsEnd < this.pagesCount - boundaryCount - 1
        ? [null]
        : this.pagesCount - boundaryCount > boundaryCount
        ? [this.pagesCount - boundaryCount]
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
    this.pageChange.emit(Math.min(this.page + 1, this.pagesCount - 1));
  }

  onPrevPage() {
    this.pageChange.emit(Math.max(0, this.page - 1));
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.pageGoTo) {
      const page = Math.max(1, Math.min(+this.pageGoTo, this.pagesCount)) - 1;
      this.pageChange.emit(page);
    }
  }
}
