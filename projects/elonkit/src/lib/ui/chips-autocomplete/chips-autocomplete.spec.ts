import { render, RenderResult } from '@testing-library/angular';

import { inject, fakeAsync, tick } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ESChipsAutocompleteModule } from './chips-autocomplete.module';
import { ChipsAutocompleteComponent } from './chips-autocomplete.component';

const FRUITS = ['Apple', 'Lemon', 'Mango'];

describe('ChipsAutocomplete', () => {
  describe('Base', () => {
    let component: RenderResult<ChipsAutocompleteComponent<any>, ChipsAutocompleteComponent<any>>;
    let overlay: OverlayContainer;
    let overlayElement: HTMLElement;

    beforeEach(async () => {
      component = await render(ChipsAutocompleteComponent, {
        imports: [ESChipsAutocompleteModule],
        componentProperties: {
          options: FRUITS
        },
        excludeComponentDeclaration: true
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
      const input = component.getByTestId('input');

      component.focusIn(input);

      const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
      expect(options).toHaveLength(3);

      // all items of FRUITS array contain in overlay
      for (const fruit of FRUITS) {
        expect(overlayElement.textContent).toContain(fruit);
      }
    }));

    it('Should display chips after chose option', fakeAsync(async () => {
      const TEXT_APPLE = 'Apple';

      const input = component.getByTestId('input');
      component.focusIn(input);

      const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
      component.click(options[0]);

      const chips = component.getAllByTestId('mat-chip');
      expect(chips).toHaveLength(1);
      expect(component.getByText(TEXT_APPLE)).toBeInTheDocument();
    }));
  });
});
