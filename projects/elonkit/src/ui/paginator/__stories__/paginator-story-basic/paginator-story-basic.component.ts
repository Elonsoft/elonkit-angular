import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-paginator-basic',
  templateUrl: './paginator-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorStoryBasicComponent {
  private _count: number;

  @Input()
  set count(value: number) {
    this._count = value;
    this.page = 1;
  }
  get count() {
    return this._count;
  }

  @Input() siblingCount;
  @Input() boundaryCount;

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
