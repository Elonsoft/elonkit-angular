import { Component, Input } from '@angular/core';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { render } from '@testing-library/angular';

import { ESAlertModule, ESAlertComponent, ESAlertVariant } from '..';

@Component({
  template: ` <es-alert typography="app-body-1">Message</es-alert> `
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

  it('Should display correct icon', async () => {
    const component = await render(ESAlertComponent, {
      imports: [ESAlertModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });

    component.fixture.componentInstance.variant = 'default';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'info' });

    component.fixture.componentInstance.variant = 'info';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'info' });

    component.fixture.componentInstance.variant = 'success';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'check_circle' });

    component.fixture.componentInstance.variant = 'warning';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'warning' });

    component.fixture.componentInstance.variant = 'error';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'error' });

    component.fixture.componentInstance.icon = 'new_releases';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'new_releases' });

    component.fixture.componentInstance.icon = undefined;
    component.fixture.componentInstance.svgIcon = 'account';
    component.fixture.componentInstance.changeDetector.detectChanges();
    expect(component.fixture.componentInstance.currentIcon).toEqual({ svgIcon: 'account' });
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
