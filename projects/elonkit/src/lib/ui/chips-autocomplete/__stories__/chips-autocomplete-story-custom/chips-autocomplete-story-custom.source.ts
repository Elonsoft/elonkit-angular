export const CHIPS_AUTOCOMPLETE_STORY_CUSTOM_SOURCE = {
  html: `
  <form [formGroup]="form">
    <mat-form-field appearance="outline" class="es-chips-autocomplete-story-custom">
      <mat-label>Friends</mat-label>
      <es-chips-autocomplete
        formControlName="chips"
        [options]="options"
        [valueFn]="valueFn"
        [displayWith]="displayWith"
        (changeText)="onChangeText($event)"
      >
        <ng-container *esChip="let option">
          <img class="es-chips-autocomplete-story-custom__option-img" [src]="option.photo" />
          {{ option.name }}
        </ng-container>
        <ng-container *esChipsAutocompleteOption="let option">
          <img class="es-chips-autocomplete-story-custom__option-img" [src]="option.photo" />
          {{ option.name }}
        </ng-container>
      </es-chips-autocomplete>
    </mat-form-field>
  </form>`,
  ts: `
    import { GetFilterOptionsByKey } from '@elonsoft/elonkit/autocomplete';
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

    @Component(...)
    export class ChipsAutocompleteCustomComponent {
      public form: FormGroup;
      public options = OPTIONS;

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
    `,
  scss: `
    .es-chips-autocomplete-story-custom {
      &__option-img {
        height: 25px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }
    `
};
