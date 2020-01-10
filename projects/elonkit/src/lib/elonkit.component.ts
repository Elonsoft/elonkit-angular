import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'es-elonkit',
  templateUrl: './elonkit.component.html',
  styleUrls: ['./elonkit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ElonkitComponent {
  @Input() text: string;

  @Output() hello = new EventEmitter<string>();

  constructor() {}

  public onClick() {
    this.hello.emit('Hello');
  }
}
