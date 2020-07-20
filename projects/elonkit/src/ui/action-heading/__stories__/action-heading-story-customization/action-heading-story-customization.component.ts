import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-action-heading-story-customization',
  templateUrl: './action-heading-story-customization.component.html',
  styleUrls: ['./action-heading-story-customization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActionHeadingStoryCustomizationComponent {
  text = 'Hello World';
}
