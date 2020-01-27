import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['Russia', 'Spain', 'India'];

@Component({
  selector: 'es-chips-autocomplete-story-checkbox',
  templateUrl: './chips-autocomplete-story-checkbox.component.html',
  styleUrls: ['./chips-autocomplete-story-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipsAutocompleteCheckboxComponent {
  public form: FormGroup;
  public options: string[] = OPTIONS;
  public withCheckbox = true;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      chips: []
    });
  }

  public onChangeText(text: string) {
    this.options = GetFilterOptions(text, OPTIONS);
  }
}
