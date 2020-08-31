import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { render } from '@testing-library/angular';

import {
  ESTimepickerModule,
  ESTimepickerComponent,
  ESTimepickerLocale,
  ESTimepickerLocaleRU
} from '..';

@Component({
  template: ` <es-timepicker [(ngModel)]="date" [required]="required"></es-timepicker> `
})
class TimepickerWrapperComponent {
  @Input() required: boolean;

  date = new Date('10.10.10 10:00:00');
}

describe('Timepicker', () => {
  it('Should mask input', async () => {
    const component = await render(ESTimepickerComponent, {
      imports: [ESTimepickerModule],
      excludeComponentDeclaration: true
    });

    const input = component.getByPlaceholderText('HH:MM') as HTMLInputElement;

    component.input(input, { target: { value: '1010' } });

    expect(component.queryByDisplayValue('10:10')).not.toBeNull();
  });

  it('Should mask input with seconds', async () => {
    const component = await render(ESTimepickerComponent, {
      componentProperties: {
        withSeconds: true
      },
      imports: [ESTimepickerModule],
      excludeComponentDeclaration: true
    });

    const input = component.getByPlaceholderText('HH:MM:SS') as HTMLInputElement;

    component.input(input, { target: { value: '101010' } });

    expect(component.queryByDisplayValue('10:10:10')).not.toBeNull();
  });

  it('Should restore previous correct value', async () => {
    const component = await render(TimepickerWrapperComponent, {
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = component.getByDisplayValue('10:00') as HTMLInputElement;

    component.input(input, { target: { value: '10' } });
    expect(component.queryByDisplayValue('10:__')).not.toBeNull();

    component.blur(input);
    expect(component.queryByDisplayValue('10:00')).not.toBeNull();
  });

  it('Should allow clearing unrequired input', async () => {
    const component = await render(TimepickerWrapperComponent, {
      componentProperties: {
        required: false
      },
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = component.getByDisplayValue('10:00') as HTMLInputElement;

    component.input(input, { target: { value: '' } });
    component.blur(input);

    expect(input.value).toBe('');
    expect(component.queryByDisplayValue('10:00')).toBeNull();
  });

  it('Should disallow clearing required input', async () => {
    const component = await render(TimepickerWrapperComponent, {
      componentProperties: {
        required: true
      },
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = component.getByDisplayValue('10:00') as HTMLInputElement;

    component.input(input, { target: { value: '' } });
    component.blur(input);

    expect(input.value).toBe('10:00');
    expect(component.queryByDisplayValue('10:00')).not.toBeNull();
  });

  it('Should change locale', async () => {
    const component = await render(ESTimepickerComponent, {
      componentProperties: {
        withSeconds: true
      },
      imports: [ESTimepickerModule],
      providers: [{ provide: ESTimepickerLocale, useClass: ESTimepickerLocaleRU }],
      excludeComponentDeclaration: true
    });

    expect(component.queryByPlaceholderText('ЧЧ:ММ:СС')).not.toBeNull();
  });
});
