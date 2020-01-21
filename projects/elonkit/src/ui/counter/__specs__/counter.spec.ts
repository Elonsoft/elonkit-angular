import { render } from '@testing-library/angular';

import { ESCounterModule, ESCounterComponent } from '..';

describe('Counter', () => {
  // This is an example of a basic test setup
  it('Should render component', async () => {
    const { getByText } = await render(ESCounterComponent, {
      imports: [ESCounterModule],
      excludeComponentDeclaration: true
    });

    // We can use getByText in order to find DOM-node by text
    expect(getByText('Counter')).toBeInTheDocument();
  });

  it('Should render correct heading', async () => {
    const { fixture, getByText } = await render(ESCounterComponent, {
      // We can pass inputs...
      componentProperties: { heading: 'Heading 1' },
      imports: [ESCounterModule],
      excludeComponentDeclaration: true
    });

    expect(getByText('Heading 1')).toBeInTheDocument();

    // ... and change them later on
    fixture.componentInstance.heading = 'Heading 2';
    fixture.componentInstance.changeDetector.detectChanges();

    expect(getByText('Heading 2')).toBeInTheDocument();
  });

  // This is an example of a actually usefull test
  it('Should increase value on click', async () => {
    const onIncrease = jest.fn();

    const { getByText, click } = await render(ESCounterComponent, {
      // We can pass outputs
      componentProperties: {
        increase: {
          emit: onIncrease
        } as any
      },
      imports: [ESCounterModule],
      excludeComponentDeclaration: true
    });

    const button = getByText('CLICK');

    expect(getByText('You clicked 0 times')).toBeInTheDocument();
    expect(getByText('You clicked 0 times')).not.toHaveClass('es-counter__count_active');

    // We can emulate user interaction
    click(button);

    expect(onIncrease).toHaveBeenCalledWith(1);
    expect(getByText('You clicked 1 times')).toBeInTheDocument();
    expect(getByText('You clicked 1 times')).toHaveClass('es-counter__count_active');

    click(button);

    expect(onIncrease).toHaveBeenCalledWith(2);
    expect(getByText('You clicked 2 times')).toBeInTheDocument();
    expect(getByText('You clicked 2 times')).toHaveClass('es-counter__count_active');
  });
});
