import { render } from '@testing-library/angular';

import { ESAvatarComponent } from '../avatar.component';
import { ESAvatarModule } from '../avatar.module';
import { ESLocaleService, en, ru } from '../../locale';

describe('Avatar', () => {
  it('Should render default avatar', async () => {
    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });
    expect(component.getByAltText(en.avatar.labelAvatar)).toBeInTheDocument();
  });

  it('Should change avatar icon', async () => {
    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    component.fixture.componentInstance.icon = 'account-round';
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.icon).toBe('account-round');

    component.fixture.componentInstance.icon = 'account-square';
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.icon).toBe('account-square');

    component.fixture.componentInstance.icon = 'seal';
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.icon).toBe('seal');

    component.fixture.componentInstance.icon = undefined;
    component.fixture.detectChanges();
    expect(component.fixture.componentInstance.icon).toBe('account-round');
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
        statusWidth: 40
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.statusBorderWidth).toBe(10);
    expect(component.fixture.componentInstance.statusHeight).toBe(40);
    expect(component.fixture.componentInstance.statusWidth).toBe(40);
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
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        text: 'НФ'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByText('НФ')).toBeInTheDocument();
  });

  it('Should accept text typography', async () => {
    const component = await render(ESAvatarComponent, {
      componentProperties: {
        text: 'НФ',
        textTypography: 'test-class'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByText('НФ')).toHaveClass('test-class');
  });

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    const component = await render(ESAvatarComponent, {
      imports: [ESAvatarModule],
      componentProperties: {
        showStatus: true,
        statusSrc: 'customPath'
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
        altText: 'alt text'
      },
      imports: [ESAvatarModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText('alt text')).toBeInTheDocument();
  });
});
