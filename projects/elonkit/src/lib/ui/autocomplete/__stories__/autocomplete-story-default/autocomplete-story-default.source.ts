export const AUTOCOMPLETE_STORY_DEFAULT_SOURCE = {
  html: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>enter text</mat-label>
        <es-autocomplete
          formControlName="autocomplete"
          [options]="options"
          [debounceTime]="500"
          [freeInput]="false"
          (changeText)="onChangeText($event)"
        >
        </es-autocomplete>
      </mat-form-field>
    </form>`,
  ts: `
    import { GetFilterOptions } from '@elonsoft/elonkit/autocomplete';

    const OPTIONS = ['One', 'Two', 'Three'];

    @Component(...)
    export class AutocompleteStoryDefaultComponent {
      public form: FormGroup;
      public options = OPTIONS;

      constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
          autocomplete: ''
        });
      }

      public onChangeText(text: string) {
        this.options = GetFilterOptions(text, OPTIONS);
      }
    }
    `
};
