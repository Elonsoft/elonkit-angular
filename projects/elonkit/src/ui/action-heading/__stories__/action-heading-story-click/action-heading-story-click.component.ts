import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-action-heading-story-click',
  templateUrl: './action-heading-story-click.component.html',
  styleUrls: ['./action-heading-story-click.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionHeadingStoryClickComponent {
  text = 'Hello World';

  public alert() {
    alert('Its working!');
  }
}
