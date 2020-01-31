export const CHIPS_AUTOCOMPLETE_STORY_CHECKBOX_SOURCE = {
  html: `
  <form [formGroup]="form">
    <mat-form-field appearance="outline">
      <mat-label>Countries</mat-label>
      <es-chips-autocomplete
        formControlName="chips"
        [options]="options"
        [withCheckbox]="withCheckbox"
        (changeText)="onChangeText($event)"
      >
      </es-chips-autocomplete>
    </mat-form-field>
  </form>`,
  ts: `
    import { GetFilterOptions } from '@elonsoft/elonkit/chips-autocomplete';
    const OPTIONS = ['Russia', 'Spain', 'India'];

    @Component(...)
    export class ChipsAutocompleteCheckboxComponent {
      public form: FormGroup;
      public options = OPTIONS;
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
    `
};
