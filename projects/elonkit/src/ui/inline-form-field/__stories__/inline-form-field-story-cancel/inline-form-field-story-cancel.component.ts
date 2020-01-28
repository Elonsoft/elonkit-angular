import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'es-inline-form-field-cancel',
  templateUrl: './inline-form-field-story-cancel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InlineFormFieldStoryCancelComponent {
  text = 'Hello World';
  private textPrevious: string;

  onEdit() {
    this.textPrevious = this.text;
  }

  onCancel() {
    this.text = this.textPrevious;
  }
}
