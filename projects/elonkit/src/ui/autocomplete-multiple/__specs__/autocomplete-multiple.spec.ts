import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { fakeAsync, inject, tick } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OverlayContainer } from '@angular/cdk/overlay';
import { getByLabelText, render, RenderResult } from '@testing-library/angular';

import { of } from 'rxjs';
import { ESAutocompleteMultipleModule } from '../autocomplete-multiple.module';
import { en } from '../../locale';
import { CoreModule } from '~storybook/core.module';
import { MatIconTestingModule } from '@angular/material/icon/testing';

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
  { id: 11, name: 'India' },
  { id: 12, name: 'Oman' }
];

const FILTERED_OPTIONS = [
  { id: 2, name: 'Iceland' },
  { id: 7, name: 'Switzerland' }
];

const SEARCH_TEXT_LA = 'la';
const SEARCH_TEXT_O = 'o';

const FIND_OPTION_ID = 10;

@Component({
  template: `
    <form [formGroup]="form">
      <mat-form-field appearance="outline">
        <mat-label>Country</mat-label>

        <es-autocomplete-multiple
          formControlName="autocomplete"
          [service]="searchService"
          [displayWith]="displayWith"
        ></es-autocomplete-multiple>
      </mat-form-field>
    </form>
  `
})
class AutocompleteMultipleComponent {
  public form = new FormGroup({
    autocomplete: new FormControl([
      { id: 3, name: 'Norway' },
      { id: 9, name: 'Portugal' },
      { id: 10, name: 'Russia' }
    ])
  });

  public options = OPTIONS;

  public searchService = (text: string, options?: any[]) => {
    const lowerText = text ? text.toLowerCase() : '';

    const filteredOptions = (options ? options : this.options).filter((option) =>
      option.name.toLowerCase().includes(lowerText)
    );

    return of(filteredOptions);
  };

  public displayWith = (value: { id: number; name: string }) => value.name;

  constructor(public changeDetector: ChangeDetectorRef) {}
}

describe('Autocomplete multiple', () => {
  let overlay: OverlayContainer;
  let overlayElement: HTMLElement;
  let component: RenderResult<AutocompleteMultipleComponent, AutocompleteMultipleComponent>;

  beforeEach(async () => {
    component = await render(AutocompleteMultipleComponent, {
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        CoreModule,
        ESAutocompleteMultipleModule,
        MatIconTestingModule
      ]
    });

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlay = oc;
      overlayElement = oc.getContainerElement();
    })();
  });

  afterEach(inject([OverlayContainer], (currentOverlay: OverlayContainer) => {
    currentOverlay.ngOnDestroy();
    overlay.ngOnDestroy();
  }));

  it('Should display passed options', fakeAsync(async () => {
    component.click(component.getByLabelText(en.autocompliteMultiple.labelOpenMenu));

    tick(1000);

    component.fixture.detectChanges();

    const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
    expect(options).toHaveLength(OPTIONS.length);

    for (const option of OPTIONS) {
      expect(overlayElement.textContent).toContain(option.name);
    }
  }));

  it('Should display passed options after search', fakeAsync(async () => {
    component.click(component.getByLabelText(en.autocompliteMultiple.labelOpenMenu));

    component.input(getByLabelText(overlayElement, en.autocompliteMultiple.labelSearch), {
      target: { value: SEARCH_TEXT_LA }
    });

    tick(1000);

    component.fixture.detectChanges();

    const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
    expect(options).toHaveLength(2);

    for (const option of FILTERED_OPTIONS) {
      expect(overlayElement.textContent).toContain(option.name);
    }
  }));

  it('Should display selected options after a series of actions', fakeAsync(() => {
    component.click(component.getByLabelText(en.autocompliteMultiple.labelOpenMenu));

    const button = getByLabelText(overlayElement, en.autocompliteMultiple.labelSearchScopeSelected);

    button.querySelector('button').click();
    tick(500);

    component.fixture.detectChanges();

    let options = overlayElement.querySelectorAll('[data-testid="mat-option"]');

    expect(options).toHaveLength(3);

    component.input(getByLabelText(overlayElement, en.autocompliteMultiple.labelSearch), {
      target: { value: SEARCH_TEXT_O }
    });
    tick(500);

    component.fixture.detectChanges();

    options = overlayElement.querySelectorAll('[data-testid="mat-option"]');

    expect(options).toHaveLength(2);

    component.click(getByLabelText(overlayElement, en.autocompliteMultiple.labelRemoveChoice));
    tick(500);

    component.fixture.detectChanges();

    const { autocomplete } = component.fixture.componentInstance.form.value;

    expect(autocomplete).toHaveLength(1);

    expect(autocomplete[0].id).toBe(FIND_OPTION_ID);
  }));
});
