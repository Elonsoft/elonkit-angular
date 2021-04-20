import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { ESLocaleService, ESLocale } from '../locale';

import { Observable } from 'rxjs';

@Component({
  selector: 'es-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESTableActionsComponent {
  private _total;

  /**
   * Total number of selected rows.
   */
  @Input() public total: number;

  /**
   * Event emitted when user clicks close button.
   */
  @Output() public closed = new EventEmitter();

  /**
   * Emit closed button click
   */
  /**
   * @internal
   * @ignore
   */
  public onCloseClick(): void {
    this.closed.emit();
  }

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  constructor(
    /**
     * @internal
     * @ignore
     */
    public localeService: ESLocaleService
  ) {
    this.locale$ = this.localeService.locale();
  }
}
