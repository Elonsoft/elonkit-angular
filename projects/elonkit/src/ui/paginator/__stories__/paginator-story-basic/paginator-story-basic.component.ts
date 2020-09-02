import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-paginator-basic',
  templateUrl: './paginator-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorStoryBasicComponent {
  private _count: number;

  @Input()
  public set count(value: number) {
    this._count = value;
    this.page = 1;
  }
  public get count() {
    return this._count;
  }

  @Input() public siblingCount: number;
  @Input() public boundaryCount: number;
  @Input() public pageSizeOptions: number[];

  public page = 1;
  public pageSize = 5;

  public onPageChange(page: number) {
    this.page = page;
  }

  public onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
  }
}
