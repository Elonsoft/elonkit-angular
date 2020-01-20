import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'es-heading',
  templateUrl: './heading.components.html',
  styleUrls: ['./heading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class HeadingComponent {
  /**
   * Button title text
   */
  @Input() public title = 'Title';

  /**
   * Route to redirect at click of a button
   */
  @Input() public backRoute: string[] = ['..'];

  constructor(public cdr: ChangeDetectorRef) {}
}
