import { fireEvent, render, RenderResult, screen } from '@testing-library/angular';

import { NgZone } from '@angular/core';
import { inject } from '@angular/core/testing';

import { CommonModule, Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { ESBreadcrumbsModule } from '..';
import { en, ESLocaleService, ru } from '../../locale';

import {
  BreadcrumbsLeafComponent,
  BreadcrumbsRootComponent,
  ROUTES
} from './breadcrumbs.spec.routes';
import { CategoriesService, ItemsService } from './breadcrumbs.spec.service';

import {
  CategoriesListResolver,
  CategoriesShowBreadcrumbsResolver,
  CategoriesShowResolver,
  ItemsListResolver,
  ItemsShowBreadcrumbsResolver,
  ItemsShowResolver
} from './breadcrumbs.spec.resolver';

const setWidth = (
  component: RenderResult<BreadcrumbsRootComponent, BreadcrumbsRootComponent>,
  width: number
) => {
  Object.defineProperty(
    (component.fixture.nativeElement as HTMLElement).querySelector('.es-breadcrumbs'),
    'clientWidth',
    { configurable: true, value: width }
  );
};

describe('Breadcrumbs', () => {
  describe('Navigation', () => {
    let component: RenderResult<BreadcrumbsRootComponent, BreadcrumbsRootComponent>;
    let overlay: OverlayContainer;
    let overlayElement: HTMLElement;

    beforeEach(async () => {
      component = await render(BreadcrumbsRootComponent, {
        declarations: [BreadcrumbsLeafComponent],
        imports: [CommonModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
        providers: [
          CategoriesService,
          ItemsService,
          CategoriesListResolver,
          CategoriesShowResolver,
          CategoriesShowBreadcrumbsResolver,
          ItemsListResolver,
          ItemsShowResolver,
          ItemsShowBreadcrumbsResolver
        ],
        componentProperties: {
          withBackButton: true
        }
      });

      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlay = oc;
        overlayElement = oc.getContainerElement();
      })();
    });

    afterEach(inject([OverlayContainer], (currentOverlay: OverlayContainer) => {
      currentOverlay.ngOnDestroy();
      overlay.ngOnDestroy();
    }));

    it('Should render hierarchy', inject(
      [NgZone, Location],
      async (zone: NgZone, location: Location) => {
        setWidth(component, 1000);

        await component.navigate('/categories/1/1/edit');
        await component.fixture.whenStable();

        zone.run(() => fireEvent.click(screen.getByText('Item #1-1')));
        await component.fixture.whenStable();

        expect(location.path()).toBe('/categories/1/1');

        zone.run(() => fireEvent.click(screen.getByText('Category #1')));
        await component.fixture.whenStable();

        expect(location.path()).toBe('/categories/1');

        zone.run(() => fireEvent.click(screen.getByText('Categories')));
        await component.fixture.whenStable();

        expect(location.path()).toBe('/categories');

        zone.run(() => fireEvent.click(component.getByLabelText('Home')));
        await component.fixture.whenStable();

        expect(location.path()).toBe('/');
      }
    ));

    it('Should have horizontal navigation', inject([Location], async (location: Location) => {
      setWidth(component, 1000);

      await component.navigate('/categories/1');
      await component.fixture.whenStable();

      const menu = component.getByLabelText('More');
      fireEvent.click(menu);

      const options = overlayElement.querySelectorAll('a');
      expect(options).toHaveLength(3);

      expect(overlayElement.textContent).toContain('Category #1');
      expect(overlayElement.textContent).toContain('Category #2');
      expect(overlayElement.textContent).toContain('Category #3');

      await component.navigate(options[1]);
      expect(location.path()).toBe('/categories/2');

      await component.navigate(options[2]);
      expect(location.path()).toBe('/categories/3');
    }));

    it('Should collapse', inject([Location], async (location: Location) => {
      setWidth(component, 125);

      await component.navigate('/categories/1/1/edit');
      await component.fixture.whenStable();

      expect(screen.queryByLabelText('Home')).not.toBeNull();
      expect(screen.queryAllByText(en.breadcrumbs.labelBack)).not.toBeNull();
      expect(screen.queryByText('Categories')).toBeNull();
      expect(screen.queryByText('Category 1')).toBeNull();
      expect(screen.queryByText('Item #1-1')).not.toBeNull();
      expect(screen.queryByText('Edit')).not.toBeNull();

      const menu = component.getByLabelText('More');
      fireEvent.click(menu);

      const options = overlayElement.querySelectorAll('.mat-menu-item');
      expect(options).toHaveLength(2);

      expect(overlayElement.textContent).toContain('Categories');
      expect(overlayElement.textContent).toContain('Category #1');

      await component.navigate(options[0]);
      await component.fixture.whenStable();

      expect(location.path()).toBe('/categories');
      expect(screen.queryByText('Categories')).not.toBeNull();
    }));
  });

  describe('Locale', () => {
    let component: RenderResult<BreadcrumbsRootComponent, BreadcrumbsRootComponent>;

    beforeEach(async () => {
      const localeService = new ESLocaleService();
      localeService.register('ru', ru);
      localeService.use('ru');

      component = await render(BreadcrumbsRootComponent, {
        declarations: [BreadcrumbsLeafComponent],
        imports: [CommonModule, ESBreadcrumbsModule, RouterTestingModule.withRoutes(ROUTES)],
        providers: [
          CategoriesService,
          ItemsService,
          CategoriesListResolver,
          CategoriesShowResolver,
          CategoriesShowBreadcrumbsResolver,
          ItemsListResolver,
          ItemsShowResolver,
          ItemsShowBreadcrumbsResolver,
          { provide: ESLocaleService, useValue: localeService }
        ]
      });
    });

    it('Should change collapse locale', async () => {
      setWidth(component, 150);

      await component.navigate('/categories/1/1/edit');
      await component.fixture.whenStable();

      expect(screen.queryByLabelText(ru.breadcrumbs.labelMore)).not.toBeNull();
    });

    it('Should change horizontal navigation locale', async () => {
      setWidth(component, 1000);

      await component.navigate('/categories/1');
      await component.fixture.whenStable();

      expect(screen.queryByLabelText(ru.breadcrumbs.labelMore)).not.toBeNull();
    });
  });
});
