export const AUTOCOMPLETE_MULTIPLE_STORY_BASIC_SOURCE = {
  ts: `
  import { Component, ViewEncapsulation } from '@angular/core';
  import { FormControl, FormGroup } from '@angular/forms';

  import { of } from 'rxjs';

  const OPTIONS = [
    { id: 1, name: 'Estonia' },
    { id: 2, name: 'Iceland' },
    { id: 3, name: 'Norway' },
    { id: 4, name: 'Lithuania' },
    { id: 5, name: 'Sweden' },
    { id: 6, name: 'Austria' },
    { id: 7, name: 'Switzerland' },
    { id: 8, name: 'Albania' },
    { id: 9, name: 'Portugal' },
    { id: 10, name: 'Russia' },
    { id: 11, name: 'Rus' }
  ];

  @Component({
    selector: 'es-autocomplete-multiple-story-basic',
    styleUrls: ['./autocomplete-multiple-story-basic.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class AutocompleteMultipleStoryBasicComponent {
    public form = new FormGroup({
      autocomplete: new FormControl([
        { id: 3, name: 'Norway' },
        { id: 9, name: 'Portugal' },
        { id: 10, name: 'Russia' }
      ])
    });

    public searchService = (text: string, options?: any[]) => {
      const source = options ? options : OPTIONS;

      return of(
        text.length
          ? source.filter((option) => option.name.toLowerCase().includes(text.toLowerCase()))
          : source
      );
    };

    public displayWith = (value: { id: number; name: string }) => value.name;
  }

  `,
  html: `
  <form class="es-autocomplete-multiple-story-basic" [formGroup]="form">
  <mat-form-field appearance="outline" class="es-autocomplete-multiple-story-basic__field">
    <mat-label>Country</mat-label>

    <es-autocomplete-multiple
      formControlName="autocomplete"
      [service]="searchService"
      [displayWith]="displayWith"
    ></es-autocomplete-multiple>
  </mat-form-field>
</form>
  `
};
