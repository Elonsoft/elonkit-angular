import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-counter-story-container',
  templateUrl: './counter-story-container.component.html',
  styleUrls: ['./counter-story-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CounterStoryContainerComponent {}
