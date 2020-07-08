import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { ESAlertVariant } from './alert.types';

@Component({
  selector: 'es-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESAlertComponent {
  @Input() variant: ESAlertVariant = 'default';
  @Input() typography = 'mat-body-1';

  private _closable = false;

  @Input()
  get closable(): boolean {
    return this._closable;
  }
  set closable(closable: boolean) {
    this._closable = coerceBooleanProperty(closable);
  }

  @Input() icon?: string;
  @Input() svgIcon?: string;

  @Output() closed = new EventEmitter();

  /**
   * @ignore
   */
  constructor(
    // We need to make changeDetector public in order to be able to use it in tests.
    public changeDetector: ChangeDetectorRef
  ) {}

  /**
   * @internal
   * @ignore
   */
  onClose() {
    this.closed.emit();
  }

  /**
   * @internal
   * @ignore
   */
  get iconText() {
    if (this.icon) {
      return this.icon;
    }
    if (this.svgIcon) {
      return '';
    }
    switch (this.variant) {
      case 'default':
        return 'info';
      case 'info':
        return 'info';
      case 'success':
        return 'check_circle';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
    }
  }
}
