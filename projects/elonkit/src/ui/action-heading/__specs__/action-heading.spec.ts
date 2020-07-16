import { ESActionHeadingComponent } from '../action-heading.component';
import { ESActionHeadingModule } from '../action-heading.module';
import { render } from '@testing-library/angular';

describe('ActionHeading', () => {
  it('Should render component with title', async () => {
    const { getByText } = await render(ESActionHeadingComponent, {
      componentProperties: {
        title: 'ActionHeading'
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    expect(getByText('ActionHeading')).toBeInTheDocument();
  });

  it('Should render component with set type', async () => {
    const component = await render(ESActionHeadingComponent, {
      componentProperties: {
        type: 'h2'
      },
      imports: [ESActionHeadingModule],
      excludeComponentDeclaration: true
    });

    expect(component.container.querySelector('h2')).toBeInTheDocument();
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
