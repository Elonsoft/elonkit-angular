import { Component } from '@angular/core';
import { render } from '@testing-library/angular';

import { ESBadgeModule } from '../badge.module';
import { ESBadgeComponent } from '../badge.component';

describe('Badge', () => {
  it('Should change badge size', async () => {
    const component = await render(ESBadgeComponent, {
      componentProperties: {
        size: 40
      },
      imports: [ESBadgeModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.componentInstance.size).toBe(40);
  });

  it('Should render alt text on icon', async () => {
    const component = await render(ESBadgeComponent, {
      componentProperties: {
        src: './test-path-to-icon',
        alt: 'alt text'
      },
      imports: [ESBadgeModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByAltText('alt text')).toBeInTheDocument();
  });

  it('Should change badge count', async () => {
    const component = await render(ESBadgeComponent, {
      componentProperties: {
        count: 1
      },
      imports: [ESBadgeModule],
      excludeComponentDeclaration: true
    });
    expect(component.getByTestId('badge')).toHaveClass('es-caption es-badge__count');
  });
});
