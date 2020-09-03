import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-inline-form-field-basic',
  templateUrl: './inline-form-field-story-basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineFormFieldStoryBasicComponent {
  public text = 'Hello World';
}
