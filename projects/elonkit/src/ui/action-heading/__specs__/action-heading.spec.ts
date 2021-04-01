import { ESActionHeadingComponent, ActionHeadingType } from '../action-heading.component';
import { ESActionHeadingModule } from '../action-heading.module';
import { render } from '@testing-library/angular';

describe('ActionHeading', () => {
  it('Should render component with title', async () => {
    const { getByText } = await render(ESActionHeadingComponent, {
      componentProperties: {
        text: 'ActionHeading'
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    expect(getByText('ActionHeading')).toBeInTheDocument();
  });

  it('Should render component with set type', async () => {
    const component = await render(ESActionHeadingComponent, {
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    const types = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    for (const type of types as ActionHeadingType[]) {
      component.fixture.componentInstance.type = type;
      component.fixture.componentInstance.changeDetector.detectChanges();
      types.forEach((item) => {
        if (item === type) {
          expect(component.container.querySelector(item)).toBeInTheDocument();
        } else {
          expect(component.container.querySelector(item)).not.toBeInTheDocument();
        }
      });
    }
  });

  it('Should render component with set color', async () => {
    const component = await render(ESActionHeadingComponent, {
      componentProperties: {
        color: 'accent'
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    expect(component.container.querySelector('button')).toHaveClass('mat-accent');
  });

  it('Should render component with set typography', async () => {
    const component = await render(ESActionHeadingComponent, {
      componentProperties: {
        text: 'ActionHeading',
        typography: 'mat-h2'
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByText('ActionHeading')).toHaveClass('mat-h2');
  });

  it('Should emit events', async () => {
    const onAction = jest.fn();
    const component = await render(ESActionHeadingComponent, {
      componentProperties: {
        action: {
          emit: onAction
        } as any
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });
    const button = component.container.querySelector('button');
    button.click();
    expect(onAction).toHaveBeenCalled();
    button.click();
    expect(onAction).toHaveBeenCalledTimes(2);
  });
});
