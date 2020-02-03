import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'es-timepicker-required',
  templateUrl: './timepicker-story-required.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerStoryRequiredComponent {
  @Input() required;

  date = new Date();
}
