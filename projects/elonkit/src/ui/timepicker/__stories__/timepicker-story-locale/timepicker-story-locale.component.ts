import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-timepicker-locale',
  templateUrl: './timepicker-story-locale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerStoryLocaleComponent {
  public date = null;
}
