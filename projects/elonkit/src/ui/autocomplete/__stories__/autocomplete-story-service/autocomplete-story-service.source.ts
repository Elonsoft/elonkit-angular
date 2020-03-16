export const AUTOCOMPLETE_STORY_SERVICE_SOURCE = {
  html: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>Color</mat-label>
        <es-autocomplete
        formControlName="autocomplete"
        [options]="options"
        [isLoading]="isLoading"
        [debounceTime]="500"
        (changeText)="onChangeText($event)"
      >
      </es-autocomplete>
      </mat-form-field>
    </form>`,
  ts: `
    import { AutocompleteService } from '../autocomplete-story-service/autocomplete.service';
    import { BehaviorSubject } from 'rxjs';
    import { switchMap, tap } from 'rxjs/operators';

    @Component(...)
    export class AutocompleteStoryDefaultComponent {
      private text$ = new BehaviorSubject<string>('');
      public form: FormGroup;
      public options = string[];
      public isLoading = false;

      constructor(
        private formBuilder: FormBuilder,
        private autocompleteService: AutocompleteService,
        private changeDetector: ChangeDetectorRef
      ) {
        this.form = this.formBuilder.group({
          autocomplete: ''
        });
        this.text$.pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(text => this.autocompleteService.getOptions(text))
      )
      .subscribe(options => {
        this.options = options.options;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      });

      public onChangeText(text: string) {
        this.text$.next(text);
      }
    }
    `
};
