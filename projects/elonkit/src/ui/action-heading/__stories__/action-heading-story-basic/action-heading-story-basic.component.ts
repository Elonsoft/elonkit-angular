import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-action-heading-story-basic',
  templateUrl: './action-heading-story-basic.component.html',
  styleUrls: ['./action-heading-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionHeadingStoryBasicComponent {
  public text = 'Hello World';
}
