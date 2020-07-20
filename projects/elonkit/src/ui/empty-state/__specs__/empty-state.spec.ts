import { render } from '@testing-library/angular';

import { ESEmptyStateModule, ESEmptyStateComponent, ESEmptyStateIIcon } from '..';

const TEXT_HEADING = 'HEADING';
const TEXT_SUBHEADING = 'SUBHEADING';

describe('EmptyState', () => {
  it('Should display heading and subheading', async () => {
    const component = await render(ESEmptyStateComponent, {
      imports: [ESEmptyStateModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        heading: TEXT_HEADING,
        subheading: TEXT_SUBHEADING
      }
    });

    expect(component.queryByText(TEXT_HEADING)).toBeInTheDocument();
    expect(component.queryByText(TEXT_SUBHEADING)).toBeInTheDocument();
  });

  it('Should accept typography classes', async () => {
    const component = await render(ESEmptyStateComponent, {
      imports: [ESEmptyStateModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        heading: TEXT_HEADING,
        headingTypography: 'app-body-1',
        subheading: TEXT_SUBHEADING,
        subheadingTypography: 'app-caption'
      }
    });

    expect(component.getByText(TEXT_HEADING)).toHaveClass('app-body-1');
    expect(component.getByText(TEXT_SUBHEADING)).toHaveClass('app-caption');
  });

  it('Should display correct prebuilt icon', async () => {
    const component = await render(ESEmptyStateComponent, {
      imports: [ESEmptyStateModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        heading: TEXT_HEADING,
        subheading: TEXT_SUBHEADING
      }
    });

    for (const icon of ['box', 'chat', 'face', 'file', 'search']) {
      component.fixture.componentInstance.icon = icon as ESEmptyStateIIcon;
      component.fixture.componentInstance.changeDetector.detectChanges();

      expect(component.getByTestId('img')).toHaveAttribute(
        'src',
        `./assets/elonkit/empty-state/${icon}.svg`
      );
    }
  });

  it('Should accept custom icon', async () => {
    const component = await render(ESEmptyStateComponent, {
      imports: [ESEmptyStateModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        iconSrc: 'www.example.com/image.png',
        heading: TEXT_HEADING,
        subheading: TEXT_SUBHEADING
      }
    });

    expect(component.getByTestId('img')).toHaveAttribute('src', 'www.example.com/image.png');
  });
});
