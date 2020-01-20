export const AUTOCOMPLETE_STORY_NG_MODEL_SOURCE = {
  html: `
    <mat-form-field appearance="outline">
      <mat-label>Season</mat-label>
      <es-autocomplete
        [(ngModel)]="text"
        [options]="options"
        [freeInput]="true"
        (changeText)="onChangeText($event)"
      >
      </es-autocomplete>
    </mat-form-field>`,
  ts: `
    import { GetFilterOptions } from '@elonsoft/elonkit/autocomplete';

    const OPTIONS = ['Winter', 'Spring', 'Summer', 'Autumn'];

    @Component(...)
    export class AutocompleteStoryNgModelComponent {
      public options: any[] = OPTIONS;
      public text = '';

      public onChangeText(text: string) {
        this.options = GetFilterOptions(text, OPTIONS);
      }
    }
    `
};
