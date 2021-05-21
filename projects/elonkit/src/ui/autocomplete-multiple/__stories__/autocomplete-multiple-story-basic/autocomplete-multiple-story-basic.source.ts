export const AUTOCOMPLETE_MULTIPLE_STORY_BASIC_SOURCE = {
  ts: `
  export class AppComponent {
    public form = new FormGroup({
      autocomplete: new FormControl([])
    });

    public searchService = (text: string) => {
      return of([]);
    };

    public displayWith = (value: { id: number; name: string }) => value.name;
  }
  `,
  html: `
  <form class="es-autocomplete-multiple-story-basic" [formGroup]="form">
  <mat-form-field appearance="outline" class="es-autocomplete-multiple-story-basic__field">
    <mat-label>Фрукты</mat-label>

    <es-autocomplete-multiple
      formControlName="autocomplete"
      [service]="searchService"
      [displayWith]="displayWith"
    ></es-autocomplete-multiple>
  </mat-form-field>
</form>
  `
};
