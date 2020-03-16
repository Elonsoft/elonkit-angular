export const AUTOCOMPLETE_STORY_CUSTOM_SOURCE = {
  html: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline" class="es-autocomplete-story-custom">
        <mat-label>Friend</mat-label>
        <es-autocomplete
          formControlName="autocomplete"
          [options]="options"
          [valueFn]="valueFn"
          (changeText)="onChangeText($event)"
        >
          <ng-container *esAutocompleteOption="let option">
            <img class="es-autocomplete-story-custom__image" [src]="option.photo" />
            {{ option.name }}
            <b>{{ option.id }}</b>
          </ng-container>
        </es-autocomplete>
      </mat-form-field>
    </form>`,
  ts: `
    import { GetFilterOptionsByKey } from '@elonsoft/elonkit/autocomplete';

    const OPTIONS = [
      {
        id: 1,
        name: 'Anna',
        photo: 'https://joeschmoe.io/api/v1/jenni'
      },
      {
        id: 2,
        name: 'Mary',
        photo: 'https://joeschmoe.io/api/v1/julie'
      },
      {
        id: 3,
        name: 'Elena',
        photo: 'https://joeschmoe.io/api/v1/jolee'
      }
    ];

    @Component(...)
    export class AutocompleteStoryCustomComponent {
      public form: FormGroup;
      public options = OPTIONS;

      constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
          autocomplete: ''
        });
      }

      public onChangeText(text: string) {
        this.options = GetFilterOptionsByKey(text, OPTIONS, 'name');
      }

      public valueFn(option: any): any {
        return option.name;
      }
    }
    `,
  scss: `
  .es-autocomplete-story-custom {
    &__image {
      height: 25px;
      margin-right: 8px;
      vertical-align: middle;
    }
  }
    `
};
