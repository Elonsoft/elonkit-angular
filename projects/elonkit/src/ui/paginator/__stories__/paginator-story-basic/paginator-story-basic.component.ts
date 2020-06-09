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
    this.page = 0;
  }
  get count() {
    return this._count;
  }

  page = 0;
  pageSize = 5;

  onPageChange(page: number) {
    this.page = page;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
  }
}
