export const CHIPS_AUTOCOMPLETE_STORY_BASIC_SOURCE = {
  html: `
  <form [formGroup]="form">
    <mat-form-field appearance="outline">
      <mat-label>Fruit</mat-label>
      <es-chips-autocomplete
        formControlName="chips"
        [options]="options"
        [color]="color"
        (changeText)="onChangeText($event)"
      >
      </es-chips-autocomplete>
    </mat-form-field>
  </form>`,
  ts: `
    import { GetFilterOptions } from '@elonsoft/elonkit/chips-autocomplete';
    const OPTIONS = ['Apple', 'Lemon', 'Mango'];

    @Component(...)
    export class ChipsAutocompleteBasicComponent {
      public form: FormGroup;
      public options = OPTIONS;
      public color = 'accent';

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
