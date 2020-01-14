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
  public form: FormGroup;
  public options: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
  public text: string;

  /**
   * Event emitted when user change value in input.
   */

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });
  }

  /**
   * @ignore
   */
  onSubmit() {
    if (this.form.valid) {
      console.log('text from autocomplete component - ', this.text);
    }
  }

  /**
   * @ignore
   */
  onChangeText(text: string) {
    this.text = text;
  }
}
