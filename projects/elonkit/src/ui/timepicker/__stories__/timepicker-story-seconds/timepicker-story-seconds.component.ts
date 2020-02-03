import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-timepicker-seconds',
  templateUrl: './timepicker-story-seconds.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerStorySecondsComponent {
  date = new Date();
}
