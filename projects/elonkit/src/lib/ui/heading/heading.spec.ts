import { render, RenderResult } from '@testing-library/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF, Location } from '@angular/common';

import { ESHeadingModule } from './heading.module';

import { inject } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `
    <router-outlet></router-outlet>
  `
})
export class HeadingParentComponent {}

@Component({
  template: '<es-heading></es-heading>'
})
export class HeadingChildComponent {}

const ROUTES = [
  {
    path: '',
    children: [
      {
        path: 'foo',
        children: [
          {
            path: '',
            component: HeadingChildComponent
          },
          {
            path: 'bar',
            component: HeadingChildComponent
          }
        ]
      }
    ]
  }
];

describe('Heading', () => {
  let component: RenderResult<HeadingParentComponent, HeadingParentComponent>;

  beforeEach(async () => {
    component = await render(HeadingParentComponent, {
      imports: [ESHeadingModule, RouterTestingModule.withRoutes(ROUTES)],
      declarations: [HeadingChildComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
    await component.navigate('/foo/bar');
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Title'`, () => {
    expect(component.getByText('Title'));
  });

  it(`should have as backRoute '..'`, () => {
    const element = component.getByLabelText('Back');
    expect(element.getAttribute('href')).toBe('/foo');
  });

  it(`should change route on link click to '/'`, inject([Location], async (location: Location) => {
    expect(location.path()).toBe('/foo/bar');

    await component.navigate(component.getByLabelText('Back'));
    expect(location.path()).toBe('/foo');

    await component.navigate(component.getByLabelText('Back'));
    expect(location.path()).toBe('/');
  }));
});
