import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions, GetFilterOptionsByKey } from '../../filter-options';

const OPTIONS = [
  {
    id: 1,
    name: 'Anna'
  },
  {
    id: 2,
    name: 'Mary'
  },
  {
    id: 3,
    name: 'Elena'
  }
];
const DEBOUNCE = 500;

@Component({
  selector: 'es-autocomplete-story-custom',
  templateUrl: './autocomplete-story-custom.component.html',
  styleUrls: ['./autocomplete-story-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryCustomComponent {
  public form: FormGroup;
  public options: any[] = OPTIONS;
  public debounceTime: number = DEBOUNCE;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });
  }

  public onChangeText(text: string) {
    this.options = GetFilterOptionsByKey(text, OPTIONS, 'name');
  }
}
