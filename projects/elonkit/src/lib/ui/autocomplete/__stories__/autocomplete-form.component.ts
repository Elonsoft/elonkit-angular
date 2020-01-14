import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../filter-options';

const OPTIONS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
const DEBOUNCE = 500;

@Component({
  selector: 'es-autocomplete-form',
  templateUrl: './autocomplete-form.component.html',
  styleUrls: ['./autocomplete-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteFormComponent {
  public form: FormGroup;
  public options: string[] = OPTIONS;
  public debounceTime: number = DEBOUNCE;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });
  }

  public onChangeText(text: string) {
    this.options = OPTIONS;
    this.options = GetFilterOptions(text, this.options);
  }
}
