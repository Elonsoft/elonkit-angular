import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'es-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent {
  /**
   * Heading text.
   */
  @Input() heading = 'Counter';

  /**
   * Event emitted when user increases a counter value.
   */
  @Output() increase = new EventEmitter<number>();

  /**
   * @ignore
   */
  value = 0;

  constructor() {}

  /**
   * @ignore
   */
  onClick() {
    this.value++;
    this.increase.emit(this.value);
  }
}
