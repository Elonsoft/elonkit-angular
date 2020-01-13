import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'es-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteFormComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
