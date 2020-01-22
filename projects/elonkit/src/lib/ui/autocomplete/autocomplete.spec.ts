import { render, RenderResult } from '@testing-library/angular';

import { inject, fakeAsync, tick } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AutocompleteModule } from './autocomplete.module';
import { AutocompleteComponent } from './autocomplete.component';

const FRUITS = ['Apple', 'Lemon', 'Mango'];

describe('Autocomplete', () => {
  describe('Base', () => {
    let component: RenderResult<AutocompleteComponent, AutocompleteComponent>;
    let overlay: OverlayContainer;
    let overlayElement: HTMLElement;

    beforeEach(async () => {
      component = await render(AutocompleteComponent, {
        imports: [AutocompleteModule],
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

    // afterEach(inject([OverlayContainer], (currentOverlay: OverlayContainer) => {
    //   currentOverlay.ngOnDestroy();
    //   overlay.ngOnDestroy();
    // }));

    it('Should display passed options', fakeAsync(async () => {
      const input = component.getByTestId('input');

      component.focusIn(input);

      const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
      expect(options).toHaveLength(3);

      // for (let i = 0; i < FRUITS.length; i++) {
      //   expect(options[i].textContent).toContain(FRUITS[i]);
      // }

      // all items of FRUITS array contain in overlay
      for (const fruit of FRUITS) {
        expect(overlayElement.textContent).toContain(fruit);
      }
    }));

    it('Should change value on input text in view of debounce time', fakeAsync(async () => {
      const TEXT_FOO = 'Foo';
      const TEXT_BAR = 'Bar';
      const onChangeText = jest.fn();
      component.fixture.componentInstance.changeText.emit = onChangeText;

      const input = component.getByTestId('input');

      component.input(input, { target: { value: TEXT_FOO } });

      tick();
      expect(onChangeText).toBeCalledTimes(1);
      expect(onChangeText).toBeCalledWith(TEXT_FOO);

      component.fixture.componentInstance.debounceTime = 100;
      component.fixture.componentInstance.changeDetector.detectChanges();

      component.input(input, { target: { value: TEXT_BAR } });

      tick(99);
      expect(onChangeText).toBeCalledTimes(1);

      tick(1);
      expect(onChangeText).toBeCalledTimes(2);
      expect(onChangeText).toBeCalledWith(TEXT_BAR);
    }));

    it('Should display entered text any kind', fakeAsync(async () => {
      const TEXT_BAZ = 'Baz';
      const TEXT_APPLE_SMTH = 'Apple232323';

      component.fixture.componentInstance.freeInput = true;
      component.fixture.componentInstance.changeDetector.detectChanges();

      const input = component.getByTestId('input');

      // if user did not choose some option
      component.focusIn(input);
      tick();

      component.input(input, { target: { value: TEXT_BAZ } });
      tick();

      component.blur(input);
      tick();

      expect(component.getByDisplayValue(TEXT_BAZ));

      // if user choose some option
      component.focusIn(input);
      tick();

      const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
      component.click(options[0]);
      tick();

      component.input(input, { target: { value: TEXT_APPLE_SMTH } });
      tick();

      component.blur(input);
      tick();

      expect(component.getByDisplayValue(TEXT_APPLE_SMTH));
    }));

    it('Should display entered text only from options', fakeAsync(async () => {
      const TEXT_BAZ = 'Baz';
      const TEXT_APPLE = 'Apple';
      const TEXT_APPLE_SMTH = 'Apple232323';

      component.fixture.componentInstance.freeInput = false;
      component.fixture.componentInstance.changeDetector.detectChanges();

      const input = component.getByTestId('input');

      // if user did not choose some option
      component.focusIn(input);
      tick();

      component.input(input, { target: { value: TEXT_BAZ } });
      tick();

      component.blur(input);
      tick();

      expect(component.getByDisplayValue(''));

      // if user choose some option
      component.focusIn(input);
      tick();

      const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
      component.click(options[0]);
      tick();

      component.input(input, { target: { value: TEXT_APPLE_SMTH } });
      tick();

      component.blur(input);
      tick();

      expect(component.getByDisplayValue(TEXT_APPLE));
    }));
  });

  describe('Custom options', () => {
    it('Should fail', () => {
      expect(2 + 2).toBe(4);
    });
  });
});
