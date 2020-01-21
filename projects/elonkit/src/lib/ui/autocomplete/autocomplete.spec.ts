import { render, RenderResult } from '@testing-library/angular';

import { inject, fakeAsync, tick } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { AutocompleteModule } from './autocomplete.module';
import { AutocompleteComponent } from './autocomplete.component';

const FRUITS = ['Apple', 'Lemon', 'Mango'];

describe('Autocomplete', () => {
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

  it('Should show length of options array', fakeAsync(async () => {
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

  it('Output changeText, Input debounce time', fakeAsync(async () => {
    const onChangeText = jest.fn();
    component.fixture.componentInstance.changeText.emit = onChangeText;

    const input = component.getByTestId('input');

    component.input(input, { target: { value: 'Foo' } });

    tick();
    expect(onChangeText).toBeCalledTimes(1);
    expect(onChangeText).toBeCalledWith('Foo');

    component.fixture.componentInstance.debounceTime = 100;
    component.fixture.componentInstance.changeDetector.detectChanges();

    component.input(input, { target: { value: 'Bar' } });

    tick(99);
    expect(onChangeText).toBeCalledTimes(1);

    tick(1);
    expect(onChangeText).toBeCalledTimes(2);
    expect(onChangeText).toBeCalledWith('Bar');
  }));

  it('Input freeInput === true', fakeAsync(async () => {
    component.fixture.componentInstance.freeInput = true;
    component.fixture.componentInstance.changeDetector.detectChanges();

    const input = component.getByTestId('input');

    // if user did not choose some option
    component.focusIn(input);
    tick();

    component.input(input, { target: { value: 'Baz' } });
    tick();

    component.blur(input);
    tick();

    expect(component.getByDisplayValue('Baz'));

    // if user choose some option
    component.focusIn(input);
    tick();

    const options = overlayElement.querySelectorAll('[data-testid="mat-option"]');
    component.click(options[0]);
    tick();

    component.input(input, { target: { value: 'Apple232323' } });
    tick();

    component.blur(input);
    tick();

    expect(component.getByDisplayValue('Apple232323'));
  }));

  it('Input freeInput === false', fakeAsync(async () => {
    component.fixture.componentInstance.freeInput = false;
    component.fixture.componentInstance.changeDetector.detectChanges();

    const input = component.getByTestId('input');

    // if user did not choose some option
    component.focusIn(input);
    tick();

    component.input(input, { target: { value: 'Baz' } });
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

    component.input(input, { target: { value: 'Apple232323' } });
    tick();

    component.blur(input);
    tick();

    expect(component.getByDisplayValue('Apple'));
  }));
});
