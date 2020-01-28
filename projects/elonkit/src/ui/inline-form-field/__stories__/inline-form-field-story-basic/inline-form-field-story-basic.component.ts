import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

const MMULTILINE = `Line 1,
Line 2`;

@Component({
  selector: 'es-inline-form-field-basic',
  templateUrl: './inline-form-field-story-basic.component.html',
  styleUrls: ['./inline-form-field-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InlineFormFieldStoryBasicComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      input: '',
      textarea: MMULTILINE
    });
  }

  get value() {
    return this.form.value;
  }
}
