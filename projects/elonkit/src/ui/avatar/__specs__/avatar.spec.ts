import { Component } from '@angular/core';
import { render } from '@testing-library/angular';

import { ESAvatarComponent } from '../avatar.component';
import { ESAvatarModule } from '../avatar.module';
import { ESLocaleService, en, ru } from '../../locale';

@Component({
  template: `<es-avatar src="./test-path-to-icon">Message</es-avatar>`
})
class AvatarComponent {}

describe('Avatar', () => {
  it('Should render default avatar', async () => {
    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      componentProperties: {
        alt: 'Avatar'
      },
      excludeComponentDeclaration: true
    });
    expect(component.getByAltText(en.avatar.labelAvatar)).toBeInTheDocument();
  });

  it('Should change avatar formType', async () => {
    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    component.fixture.componentInstance.formType = 'round';
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.formType).toBe('round');

    component.fixture.componentInstance.formType = 'square';
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.formType).toBe('square');
  });

  it('Should render custom avatar icon', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        avatarSrc: 'customPath'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.src).toBe('customPath');
  });

  it('Should change avatar properties', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        borderRadius: 48,
        width: 200,
        height: 200
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.borderRadius).toBe(48);
    expect(component.fixture.componentInstance.width).toBe(200);
    expect(component.fixture.componentInstance.height).toBe(200);
  });

  it('Should enable status on input', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        showStatus: true
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByTestId('status')).toBeInTheDocument();
  });

  it('Should change status properties', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        showStatus: true,
        statusBorderWidth: 10,
        statusHeight: 40,
        statusWidth: 40,
        statusBorderColor: '#fff'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.statusBorderWidth).toBe(10);
    expect(component.fixture.componentInstance.statusHeight).toBe(40);
    expect(component.fixture.componentInstance.statusWidth).toBe(40);
    expect(component.fixture.componentInstance.statusBorderColor).toBe('#fff');
  });

  it('Should render custom status icon', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        showStatus: true,
        statusSrc: 'customPath'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText(en.avatar.labelStatus)).toBeInTheDocument();
    expect(component.getByTestId('status')).toHaveClass('es-avatar__status_custom');
  });

  it('Should render text on input', async () => {
    const component = await render(AvatarComponent, {
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

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      componentProperties: {
        showStatus: true,
        statusSrc: 'customPath',
        alt: 'Аватар'
      },
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText(ru.avatar.labelAvatar)).toBeInTheDocument();
    expect(component.getByAltText(ru.avatar.labelStatus)).toBeInTheDocument();
  });

  it('Should render alt text on image', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        alt: 'alt text'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText('alt text')).toBeInTheDocument();
  });
});
