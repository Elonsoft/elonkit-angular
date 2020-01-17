import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['One', 'Two', 'Three'];

@Component({
  selector: 'es-autocomplete-story-default',
  templateUrl: './autocomplete-story-default.component.html',
  styleUrls: ['./autocomplete-story-default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryDefaultComponent {
  public form: FormGroup;
  public options: any[] = OPTIONS;
  @Input() public debounceTime: number;
  @Input() public freeInput: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: ''
    });
  }

  public onChangeText(text: string) {
    this.options = GetFilterOptions(text, OPTIONS);
  }
}
