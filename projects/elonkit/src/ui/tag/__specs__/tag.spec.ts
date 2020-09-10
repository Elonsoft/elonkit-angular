import { render } from '@testing-library/angular';
import { ESTagModule, ESTagComponent } from '..';
import { Component } from '@angular/core';

@Component({
  template: ` <es-tag>Tag</es-tag> `
})
class ESTagWrapperdComponent {}

describe('Tag', () => {
  it('Should show content', async () => {
    const component = await render(ESTagWrapperdComponent, {
      imports: [ESTagModule]
    });

    expect(component.getByText('Tag')).toBeInTheDocument();
  });

  it('Should show with default colors', async () => {
    const component = await render(ESTagComponent, {
      imports: [ESTagModule],
      excludeComponentDeclaration: true
    });

    expect(component.fixture.nativeElement.querySelector('.es-tag').style.backgroundColor).toBe(
      'rgb(0, 0, 0)'
    );
    expect(component.fixture.nativeElement.querySelector('.es-tag__text').style.color).toBe(
      'rgb(255, 255, 255)'
    );
  });

  it('Should change colors', async () => {
    const component = await render(ESTagComponent, {
      imports: [ESTagModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        color: 'rgb(255, 255, 1)',
        textColor: 'rgb(255, 255, 2)'
      }
    });

    expect(component.fixture.nativeElement.querySelector('.es-tag').style.backgroundColor).toBe(
      'rgb(255, 255, 1)'
    );
    expect(component.fixture.nativeElement.querySelector('.es-tag__text').style.color).toBe(
      'rgb(255, 255, 2)'
    );
  });

  it('Should show right icon', async () => {
    const component = await render(ESTagComponent, {
      imports: [ESTagModule],
      excludeComponentDeclaration: true,
      componentProperties: {
        icon: 'info'
      }
    });

    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'info' });

    component.fixture.componentInstance.icon = null;
    component.fixture.componentInstance.svgIcon = 'test';
    expect(component.fixture.componentInstance.currentIcon).toEqual({ svgIcon: 'test' });

    component.fixture.componentInstance.icon = 'info';
    component.fixture.componentInstance.svgIcon = 'test';
    expect(component.fixture.componentInstance.currentIcon).toEqual({ icon: 'info' });
  });
});
