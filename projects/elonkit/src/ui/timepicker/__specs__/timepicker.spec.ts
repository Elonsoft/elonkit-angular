import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { fireEvent, render, screen } from '@testing-library/angular';

import { ESTimepickerComponent, ESTimepickerModule } from '..';
import { ESLocaleService, ru } from '../../locale';

@Component({
  template: ` <es-timepicker [(ngModel)]="date" [required]="required"></es-timepicker> `
})
class TimepickerWrapperComponent {
  @Input() public required: boolean;

  public date = new Date('10.10.10 10:00:00');
}

describe('Timepicker', () => {
  it('Should mask input', async () => {
    await render(ESTimepickerComponent, {
      imports: [ESTimepickerModule],
      excludeComponentDeclaration: true
    });

    const input = screen.getByPlaceholderText('HH:MM') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '1010' } });

    expect(screen.queryByDisplayValue('10:10')).not.toBeNull();
  });

  it('Should mask input with seconds', async () => {
    await render(ESTimepickerComponent, {
      componentProperties: {
        withSeconds: true
      },
      imports: [ESTimepickerModule],
      excludeComponentDeclaration: true
    });

    const input = screen.getByPlaceholderText('HH:MM:SS') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '101010' } });

    expect(screen.queryByDisplayValue('10:10:10')).not.toBeNull();
  });

  it('Should restore previous correct value', async () => {
    await render(TimepickerWrapperComponent, {
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = screen.getByDisplayValue('10:00') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '10' } });
    expect(screen.queryByDisplayValue('10:__')).not.toBeNull();

    fireEvent.blur(input);
    expect(screen.queryByDisplayValue('10:00')).not.toBeNull();
  });

  it('Should allow clearing unrequired input', async () => {
    await render(TimepickerWrapperComponent, {
      componentProperties: {
        required: false
      },
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = screen.getByDisplayValue('10:00') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(input.value).toBe('');
    expect(screen.queryByDisplayValue('10:00')).toBeNull();
  });

  it('Should disallow clearing required input', async () => {
    await render(TimepickerWrapperComponent, {
      componentProperties: {
        required: true
      },
      imports: [FormsModule, ESTimepickerModule]
    });

    const input = screen.getByDisplayValue('10:00') as HTMLInputElement;

    fireEvent.input(input, { target: { value: '' } });
    fireEvent.blur(input);

    expect(input.value).toBe('10:00');
    expect(screen.queryByDisplayValue('10:00')).not.toBeNull();
  });

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    await render(ESTimepickerComponent, {
      componentProperties: {
        withSeconds: true
      },
      imports: [ESTimepickerModule],
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });

    const {
      timepicker: { labelHH, labelMM, labelSS }
    } = ru;

    expect(screen.queryByPlaceholderText(`${labelHH}:${labelMM}:${labelSS}`)).not.toBeNull();
  });
});
