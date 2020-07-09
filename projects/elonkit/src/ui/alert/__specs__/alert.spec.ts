import { Component } from '@angular/core';
import { render } from '@testing-library/angular';

import {
  ESAlertModule,
  ESAlertComponent,
  ESAlertLocale,
  ESAlertLocaleRU,
  ESAlertVariant
} from '..';

@Component({
  template: `
    <es-alert typography="app-body-1">Message</es-alert>
  `
})
class AlertTypographyWrapperComponent {}

describe('Alert', () => {
  it('Should change styles based on variant', async () => {
    const component = await render(ESAlertComponent, {
      imports: [ESAlertModule],
      excludeComponentDeclaration: true
    });

    for (const variant of ['default', 'info', 'success', 'warning', 'error'] as ESAlertVariant[]) {
      component.fixture.componentInstance.variant = variant;
      component.fixture.componentInstance.changeDetector.detectChanges();

      expect(component.getByTestId('root')).toHaveClass(`es-alert_variant_${variant}`);
    }
  });

  it('Should emit close event', async () => {
    const locale = new ESAlertLocale();
    const onClose = jest.fn();

    const component = await render(ESAlertComponent, {
      imports: [ESAlertModule],
      componentProperties: {
        closable: true,
        closed: { emit: onClose } as any
      },
      excludeComponentDeclaration: true
    });

    component.click(component.getByLabelText(locale.labelClose));
    expect(onClose).toBeCalled();
  });

  it('Should change locale', async () => {
    const locale = new ESAlertLocaleRU();

    const component = await render(ESAlertComponent, {
      imports: [ESAlertModule],
      componentProperties: {
        closable: true
      },
      providers: [{ provide: ESAlertLocale, useClass: ESAlertLocaleRU }],
      excludeComponentDeclaration: true
    });

    expect(component.queryByLabelText(locale.labelClose)).not.toBeNull();
  });

  it('Should accept typography class', async () => {
    const component = await render(AlertTypographyWrapperComponent, {
      imports: [ESAlertModule]
    });

    expect(component.getByText('Message')).toHaveClass('app-body-1');
  });
});
