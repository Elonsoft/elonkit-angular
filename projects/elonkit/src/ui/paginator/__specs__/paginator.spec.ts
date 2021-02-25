import { inject } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { render, getByText } from '@testing-library/angular';

import { ESPaginatorModule, ESPaginatorComponent } from '..';
import { ESLocaleService, en, ru } from '../../locale';

describe('Paginator', () => {
  it('Should calculate corrent number of pages', async () => {
    const component = await render(ESPaginatorComponent, {
      componentProperties: {
        count: 100,
        page: 1,
        pageSize: 5,
        siblingCount: 2,
        boundaryCount: 1
      },
      imports: [ESPaginatorModule],
      excludeComponentDeclaration: true
    });

    expect(component.queryByText('1')).toBeInTheDocument();
    expect(component.queryByText('2')).toBeInTheDocument();
    expect(component.queryByText('3')).toBeInTheDocument();
    expect(component.queryByText('4')).toBeInTheDocument();
    expect(component.queryByText('5')).toBeInTheDocument();
    expect(component.queryByText('6')).toBeInTheDocument();
    expect(component.queryByText('7')).toBeInTheDocument();
    expect(component.queryByText('8')).toBeNull();
    // ...
    expect(component.queryByText('19')).toBeNull();
    expect(component.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.page = 10;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(component.queryByText('1')).toBeInTheDocument();
    expect(component.queryByText('2')).toBeNull();
    // ...
    expect(component.queryByText('7')).toBeNull();
    expect(component.queryByText('8')).toBeInTheDocument();
    expect(component.queryByText('9')).toBeInTheDocument();
    expect(component.queryByText('10')).toBeInTheDocument();
    expect(component.queryByText('11')).toBeInTheDocument();
    expect(component.queryByText('12')).toBeInTheDocument();
    expect(component.queryByText('13')).toBeNull();
    // ...
    expect(component.queryByText('19')).toBeNull();
    expect(component.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.siblingCount = 1;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(component.queryByText('1')).toBeInTheDocument();
    expect(component.queryByText('2')).toBeNull();
    // ...
    expect(component.queryByText('8')).toBeNull();
    expect(component.queryByText('9')).toBeInTheDocument();
    expect(component.queryByText('10')).toBeInTheDocument();
    expect(component.queryByText('11')).toBeInTheDocument();
    expect(component.queryByText('12')).toBeNull();
    // ...
    expect(component.queryByText('19')).toBeNull();
    expect(component.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.boundaryCount = 2;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(component.queryByText('1')).toBeInTheDocument();
    expect(component.queryByText('2')).toBeInTheDocument();
    expect(component.queryByText('3')).toBeNull();
    // ...
    expect(component.queryByText('8')).toBeNull();
    expect(component.queryByText('9')).toBeInTheDocument();
    expect(component.queryByText('10')).toBeInTheDocument();
    expect(component.queryByText('11')).toBeInTheDocument();
    expect(component.queryByText('12')).toBeNull();
    // ...
    expect(component.queryByText('18')).toBeNull();
    expect(component.queryByText('19')).toBeInTheDocument();
    expect(component.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.page = 20;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(component.queryByText('1')).toBeInTheDocument();
    expect(component.queryByText('2')).toBeInTheDocument();
    expect(component.queryByText('3')).toBeNull();
    // ...
    expect(component.queryByText('14')).toBeNull();
    expect(component.queryByText('15')).toBeInTheDocument();
    expect(component.queryByText('16')).toBeInTheDocument();
    expect(component.queryByText('17')).toBeInTheDocument();
    expect(component.queryByText('18')).toBeInTheDocument();
    expect(component.queryByText('19')).toBeInTheDocument();
    expect(component.queryByText('20')).toBeInTheDocument();
  });

  it('Should emit events', async () => {
    const onPageChange = jest.fn();
    const onPageSizeChange = jest.fn();

    const component = await render(ESPaginatorComponent, {
      componentProperties: {
        count: 100,
        page: 5,
        pageSize: 10,
        pageChange: {
          emit: onPageChange
        } as any,
        pageSizeChange: {
          emit: onPageSizeChange
        } as any
      },
      imports: [ESPaginatorModule],
      excludeComponentDeclaration: true
    });

    component.click(component.getByLabelText(en.paginator.labelPrev));
    expect(onPageChange).toBeCalledWith(4);

    component.click(component.getByLabelText(en.paginator.labelNext));
    expect(onPageChange).toBeCalledWith(6);

    component.click(component.getByText('7'));
    expect(onPageChange).toBeCalledWith(7);

    component.input(component.getByLabelText(en.paginator.labelGoTo), { target: { value: '10' } });
    component.submit(component.getByLabelText(en.paginator.labelGoTo));
    expect(onPageChange).toBeCalledWith(10);

    component.click(
      component.getByLabelText(en.paginator.labelItemsPerPage).querySelector('.mat-select-trigger')
    );
    component.click(getByText(document.body, /250/));

    expect(onPageSizeChange).toBeCalledWith(250);
  });

  it('Should accept page size options', async () => {
    let overlay: OverlayContainer;
    let overlayElement: HTMLElement;

    const component = await render(ESPaginatorComponent, {
      componentProperties: {
        count: 100,
        page: 5,
        pageSize: 10,
        pageSizeOptions: [10, 20, 30]
      },
      imports: [ESPaginatorModule],
      excludeComponentDeclaration: true
    });

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlay = oc;
      overlayElement = oc.getContainerElement();
    })();

    component.click(
      component.getByLabelText(en.paginator.labelItemsPerPage).querySelector('.mat-select-trigger')
    );

    const options = overlayElement.querySelectorAll('.mat-option');

    expect(options).toHaveLength(3);
    expect(options[0].textContent).toContain('10');
    expect(options[1].textContent).toContain('20');
    expect(options[2].textContent).toContain('30');

    inject([OverlayContainer], (currentOverlay: OverlayContainer) => {
      currentOverlay.ngOnDestroy();
      overlay.ngOnDestroy();
    })();
  });

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    const component = await render(ESPaginatorComponent, {
      componentProperties: {
        count: 100,
        page: 1,
        pageSize: 10,
        siblingCount: 2,
        boundaryCount: 1
      },
      imports: [ESPaginatorModule],
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });

    expect(component.getByLabelText(ru.paginator.labelItemsPerPage)).toBeInTheDocument();
    expect(component.getByTestId('es-paginator-pages')).toHaveTextContent(
      `${ru.paginator.labelOf}`
    );
    expect(component.getByLabelText(ru.paginator.labelPrev)).toBeInTheDocument();
    expect(component.getByLabelText(ru.paginator.labelPrev)).toBeInTheDocument();
    expect(component.getByLabelText(ru.paginator.labelGoTo)).toBeInTheDocument();
    expect(component.getByPlaceholderText(`1 ${ru.paginator.labelPage}`)).toBeInTheDocument();
  });
});
