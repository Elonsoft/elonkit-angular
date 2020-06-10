import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { ESPaginatorLocale } from './paginator.component.locale';

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

export interface ESPaginatorDefaultOptions {
  pageSizeOptions?: number[];
  siblingCount?: number;
  boundaryCount?: number;
}

export const ES_PAGINATOR_DEFAULT_OPTIONS = new InjectionToken<ESPaginatorDefaultOptions>(
  'ES_PAGINATOR_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESPaginatorComponent {
  /**
   * The count of the total number of items that are being paginated.
   */
  @Input() count: number;

  // tslint:disable-next-line
  private _page: number;

  /**
   * The current page.
   */
  @Input()
  set page(page: number) {
    this.pageGoTo = '';
    this._page = page;
  }
  get page() {
    return this._page;
  }

  /**
   * Number of items to display on a page.
   */
  @Input() pageSize: number;

  private _pageSizeOptions: number[];

  /**
   * The set of provided page size options to display to the user.
   */
  @Input()
  get pageSizeOptions(): number[] {
    return this._pageSizeOptions;
  }
  set pageSizeOptions(value: number[]) {
    this._pageSizeOptions = value ||
      this.defaultOptions?.pageSizeOptions || [5, 10, 25, 50, 100, 250, 500];
  }

  private _siblingCount: number;

  /**
   * Number of always visible pages before and after the current page.
   */
  @Input()
  get siblingCount(): number {
    return this._siblingCount;
  }
  set siblingCount(value: number) {
    this._siblingCount = value ?? this.defaultOptions?.siblingCount ?? 2;
  }

  private _boundaryCount: number;

  /**
   * Number of always visible pages at the beginning and end.
   */
  @Input()
  get boundaryCount(): number {
    return this._boundaryCount;
  }
  set boundaryCount(value: number) {
    this._boundaryCount = value ?? this.defaultOptions?.boundaryCount ?? 1;
  }

  /**
   * Event emitted when the paginator changes the page index.
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Event emitted when the paginator changes the page size.
   */
  @Output() pageSizeChange = new EventEmitter<number>();

  /**
   * @internal
   * @ignore
   */
  pageGoTo = '';

  constructor(
    /**
     * @internal
     */
    public locale: ESPaginatorLocale,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_PAGINATOR_DEFAULT_OPTIONS)
    private defaultOptions: ESPaginatorDefaultOptions
  ) {
    if (this.defaultOptions?.pageSizeOptions) {
      this.pageSizeOptions = this.defaultOptions.pageSizeOptions;
    }
    if (this.defaultOptions?.siblingCount) {
      this.siblingCount = this.defaultOptions.siblingCount;
    }
    if (this.defaultOptions?.boundaryCount) {
      this.boundaryCount = this.defaultOptions.boundaryCount;
    }
  }

  /**
   * @internal
   * @ignore
   */
  get countStart() {
    return (this.page - 1) * this.pageSize + (this.count ? 1 : 0);
  }

  /**
   * @internal
   * @ignore
   */
  get countEnd() {
    return Math.min(this.page * this.pageSize, this.count);
  }

  /**
   * @internal
   * @ignore
   */
  get pagesCount() {
    return Math.ceil(this.count / this.pageSize);
  }

  /**
   * @internal
   * @ignore
   */
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

  /**
   * @internal
   * @ignore
   */
  onPageSizeChange(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }

  /**
   * @internal
   * @ignore
   */
  onPageClick(page: number) {
    this.pageChange.emit(page);
  }

  /**
   * @internal
   * @ignore
   */
  onNextPage() {
    this.pageChange.emit(Math.min(this.page + 1, this.pagesCount));
  }

  /**
   * @internal
   * @ignore
   */
  onPrevPage() {
    this.pageChange.emit(Math.max(1, this.page - 1));
  }

  /**
   * @internal
   * @ignore
   */
  onSubmit(event: Event) {
    event.preventDefault();
    if (this.pageGoTo) {
      const page = Math.max(1, Math.min(+this.pageGoTo, this.pagesCount));
      this.pageChange.emit(page);
    }
  }
}
