import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
const DEBOUNCE = 500;

@Component({
  selector: 'es-autocomplete-story-service',
  templateUrl: './autocomplete-story-service.component.html',
  styleUrls: ['./autocomplete-story-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryServiceComponent {
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
