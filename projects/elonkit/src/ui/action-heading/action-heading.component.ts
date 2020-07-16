import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-action-heading',
  templateUrl: './action-heading.component.html',
  styleUrls: ['./action-heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ESActionHeadingComponent {
  @Input()
  public title: string;
  @Input()
  public type: 'h1' | 'h2' = 'h1';
  @Input()
  public color: 'primary' | 'warn' | 'accent' = 'primary';
  @Output()
  public action: EventEmitter<any> = new EventEmitter();
}
