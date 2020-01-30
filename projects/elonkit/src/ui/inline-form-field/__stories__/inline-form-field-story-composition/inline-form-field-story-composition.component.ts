import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'es-inline-form-field-composition',
  templateUrl: './inline-form-field-story-composition.component.html',
  styleUrls: ['./inline-form-field-story-composition.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InlineFormFieldStoryCompositionComponent {
  date = new Date();
  text = 'Prefix & Suffix';
  select = 'Grape';
  hint = 'Input with hint';
}
