import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-inline-form-field-locale',
  templateUrl: './inline-form-field-story-locale.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineFormFieldStoryLocaleComponent {
  text = 'Привет Мир';
}
