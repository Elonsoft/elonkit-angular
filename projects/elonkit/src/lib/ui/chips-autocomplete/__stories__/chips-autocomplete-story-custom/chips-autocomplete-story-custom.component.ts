import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptionsByKey } from '../../filter-options';

const OPTIONS = [
  {
    name: 'Anna',
    photo: 'https://joeschmoe.io/api/v1/jenni'
  },
  {
    name: 'Mary',
    photo: 'https://joeschmoe.io/api/v1/julie'
  },
  {
    name: 'Elena',
    photo: 'https://joeschmoe.io/api/v1/jolee'
  }
];

@Component({
  selector: 'es-chips-autocomplete-story-custom',
  templateUrl: './chips-autocomplete-story-custom.component.html',
  styleUrls: ['./chips-autocomplete-story-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipsAutocompleteCustomComponent {
  public form: FormGroup;
  public options: any[] = OPTIONS;
  public unique = true;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      chips: []
    });
  }

  public onChangeText(text: string) {
    this.options = GetFilterOptionsByKey(text, OPTIONS, 'name');
  }

  public valueFn(option: any): any {
    return option;
  }

  public displayWith(option: any): any {
    return option.name;
  }
}
