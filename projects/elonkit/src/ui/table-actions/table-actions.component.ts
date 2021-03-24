import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  InjectionToken,
  Output,
  Optional,
  Inject,
  EventEmitter
} from '@angular/core';

import { ESTableActionsDefaultOptions } from './table-actions.types';

export const ES_TABLE_ACTIONS_DEFAULT_OPTIONS = new InjectionToken<ESTableActionsDefaultOptions>(
  'ES_TABLE_ACTIONS_DEFAULT_OPTIONS'
);

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
   * Total number of selected rows
   */
  @Input()
  public get total(): ESTableActionsDefaultOptions {
    return this._total;
  }
  public set total(value: ESTableActionsDefaultOptions) {
    this._total = value || this.defaultOptions?.total || null;
  }

  /**
   * Event emitted when user clicks close button.
   */
  @Output() public closed = new EventEmitter();

  /**
   * Emit closed button click
   */
  public onCloseClick(): void {
    this.closed.emit();
  }

  constructor(
    @Optional()
    @Inject(ES_TABLE_ACTIONS_DEFAULT_OPTIONS)
    private defaultOptions: ESTableActionsDefaultOptions,
  ) {}
}
