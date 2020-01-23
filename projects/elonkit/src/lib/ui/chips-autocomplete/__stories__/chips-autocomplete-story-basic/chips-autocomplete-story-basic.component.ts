import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['Apple', 'Lemon', 'Mango'];

@Component({
  selector: 'es-chips-autocomplete-story-basic',
  templateUrl: './chips-autocomplete-story-basic.component.html',
  styleUrls: ['./chips-autocomplete-story-basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipsAutocompleteBasicComponent {
  public form: FormGroup;
  public options: any[] = OPTIONS;
  public chips: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      chips: ''
    });
  }

  public onChangeText(text: string) {
    this.options = GetFilterOptions(text, OPTIONS);
  }
}
