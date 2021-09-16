import { inject } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { fireEvent, getByText, render, screen } from '@testing-library/angular';

import { ESPaginatorComponent, ESPaginatorModule } from '..';
import { en, ESLocaleService, ru } from '../../locale';

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

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).toBeInTheDocument();
    expect(screen.queryByText('5')).toBeInTheDocument();
    expect(screen.queryByText('6')).toBeInTheDocument();
    expect(screen.queryByText('7')).toBeInTheDocument();
    expect(screen.queryByText('8')).toBeNull();
    // ...
    expect(screen.queryByText('19')).toBeNull();
    expect(screen.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.page = 10;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeNull();
    // ...
    expect(screen.queryByText('7')).toBeNull();
    expect(screen.queryByText('8')).toBeInTheDocument();
    expect(screen.queryByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('11')).toBeInTheDocument();
    expect(screen.queryByText('12')).toBeInTheDocument();
    expect(screen.queryByText('13')).toBeNull();
    // ...
    expect(screen.queryByText('19')).toBeNull();
    expect(screen.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.siblingCount = 1;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeNull();
    // ...
    expect(screen.queryByText('8')).toBeNull();
    expect(screen.queryByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('11')).toBeInTheDocument();
    expect(screen.queryByText('12')).toBeNull();
    // ...
    expect(screen.queryByText('19')).toBeNull();
    expect(screen.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.boundaryCount = 2;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeNull();
    // ...
    expect(screen.queryByText('8')).toBeNull();
    expect(screen.queryByText('9')).toBeInTheDocument();
    expect(screen.queryByText('10')).toBeInTheDocument();
    expect(screen.queryByText('11')).toBeInTheDocument();
    expect(screen.queryByText('12')).toBeNull();
    // ...
    expect(screen.queryByText('18')).toBeNull();
    expect(screen.queryByText('19')).toBeInTheDocument();
    expect(screen.queryByText('20')).toBeInTheDocument();

    component.fixture.componentInstance.page = 20;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(screen.queryByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).toBeInTheDocument();
    expect(screen.queryByText('3')).toBeNull();
    // ...
    expect(screen.queryByText('14')).toBeNull();
    expect(screen.queryByText('15')).toBeInTheDocument();
    expect(screen.queryByText('16')).toBeInTheDocument();
    expect(screen.queryByText('17')).toBeInTheDocument();
    expect(screen.queryByText('18')).toBeInTheDocument();
    expect(screen.queryByText('19')).toBeInTheDocument();
    expect(screen.queryByText('20')).toBeInTheDocument();
  });

  it('Should emit events', async () => {
    const onPageChange = jest.fn();
    const onPageSizeChange = jest.fn();

    await render(ESPaginatorComponent, {
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

    fireEvent.click(screen.getByLabelText(en.paginator.labelPrev));
    expect(onPageChange).toBeCalledWith(4);

    fireEvent.click(screen.getByLabelText(en.paginator.labelNext));
    expect(onPageChange).toBeCalledWith(6);

    fireEvent.click(screen.getByText('7'));
    expect(onPageChange).toBeCalledWith(7);

    fireEvent.input(screen.getByLabelText(en.paginator.labelGoTo), { target: { value: '10' } });
    fireEvent.submit(screen.getByLabelText(en.paginator.labelGoTo));
    expect(onPageChange).toBeCalledWith(10);

    fireEvent.click(
      screen.getByLabelText(en.paginator.labelItemsPerPage).querySelector('.mat-select-trigger')
    );
    fireEvent.click(getByText(document.body, /250/));

    expect(onPageSizeChange).toBeCalledWith(250);
  });

  it('Should accept page size options', async () => {
    let overlay: OverlayContainer;
    let overlayElement: HTMLElement;

    await render(ESPaginatorComponent, {
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

    fireEvent.click(
      screen.getByLabelText(en.paginator.labelItemsPerPage).querySelector('.mat-select-trigger')
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

    await render(ESPaginatorComponent, {
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

    expect(screen.getByLabelText(ru.paginator.labelItemsPerPage)).toBeInTheDocument();
    expect(screen.getByText(`1 — 10 ${ru.paginator.labelOf} 100`)).toBeInTheDocument();
    expect(screen.getByLabelText(ru.paginator.labelPrev)).toBeInTheDocument();
    expect(screen.getByLabelText(ru.paginator.labelPrev)).toBeInTheDocument();
    expect(screen.getByLabelText(ru.paginator.labelGoTo)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(`1 ${ru.paginator.labelPage}`)).toBeInTheDocument();
  });
});
