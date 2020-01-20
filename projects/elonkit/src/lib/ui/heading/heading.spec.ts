import { TestBed, async, ComponentFixture, inject, tick, fakeAsync } from '@angular/core/testing';
import { render } from '@testing-library/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule, APP_BASE_HREF, Location } from '@angular/common';
import { HeadingComponent } from './heading.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

const ROUTES = [
  {
    path: '',
    component: HeadingComponent,
    children: [
      {
        path: 'some-route',
        component: HeadingComponent
      }
    ]
  }
];

describe('Heading', () => {
  let fixture: ComponentFixture<HeadingComponent>;
  let component: HeadingComponent;
  let element: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeadingComponent],
      imports: [
        MatIconModule,
        MatButtonModule,
        CommonModule,
        RouterTestingModule.withRoutes(ROUTES)
      ],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(HeadingComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    component.cdr.detectChanges();

    fixture.ngZone.run(() => {
      router.navigate(['/some-route']);
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Title'`, () => {
    expect(component.title).toBe('Title');
  });

  it(`should have as backRoute '..'`, () => {
    expect(component.backRoute).toEqual(['..']);
  });

  it(`should change route on link click to '/'`, async () => {
    expect(location.path()).toBe('/some-route');
    element.querySelector('a').click();
    await fixture.whenStable();
    expect(location.path()).toBe('/');
  });
});
