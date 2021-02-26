import { Component } from '@angular/core';
import { render } from '@testing-library/angular';

import { ESAvatarComponent } from '../avatar.component';
import { ESAvatarModule } from '../avatar.module';
import { ESAvatarForm } from '../avatar.types';
import { ESLocaleService, en, ru } from '../../locale';

@Component({
  template: `<es-avatar alt="Аватар" src="./test-path-to-icon">Message</es-avatar>`
})
class AvatarComponent {}

@Component({
  template: `<es-avatar>Message</es-avatar>`
})
class AvatarTypographyComponent {}

describe('Avatar', () => {
  it('Should change avatar variant', async () => {
    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    component.fixture.componentInstance.variant = ESAvatarForm.Round;
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.variant).toBe('round');

    component.fixture.componentInstance.variant = ESAvatarForm.Square;
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.variant).toBe('square');
  });

  it('Should change avatar properties', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        size: 200
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.size).toBe(200);
    expect(component.fixture.componentInstance.size).toBe(200);
  });

  it('Should render text on input', async () => {
    const component = await render(AvatarTypographyComponent, {
      imports: [ESAvatarModule]
    });
    expect(component.getByText('Message')).toBeInTheDocument();
  });

  it('Should accept class typography', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        textTypography: 'test-class'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByTestId('typography')).toHaveClass('test-class');
  });

  it('Should render alt text on image', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        src: './test-path-to-icon',
        alt: 'alt text'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText('alt text')).toBeInTheDocument();
  });
});
