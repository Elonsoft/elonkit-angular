import { render } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { ESImageCarouselComponent } from '../image-carousel.component';
import { ESImageCarouselModule } from '../image-carousel.module';
import { filesFixture } from '../fixtures/files.fixture';
import { ESLocaleService, en, ru } from '../../locale';

describe('Image Carousel', () => {
  beforeEach(() => {
    spyOn(ESImageCarouselComponent.prototype, 'elementIsInView').and.returnValue(true);
  });

  it('Should render all images', async () => {
    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByTestId('image')).toHaveLength(filesFixture.length);
  });

  it('Should render all buttons', async () => {
    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture,
        canView: true,
        canRemove: true
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });

    expect(component.getAllByLabelText(en.imageCarousel.labelRemove)).toHaveLength(
      filesFixture.length
    );
    expect(component.getAllByLabelText(en.imageCarousel.labelView)).toHaveLength(
      filesFixture.length
    );
    expect(component.getByLabelText(en.imageCarousel.labelSlideLeft)).toBeInTheDocument();
    expect(component.getByLabelText(en.imageCarousel.labelSlideRight)).toBeInTheDocument();
  });

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture,
        canView: true,
        canRemove: true
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByLabelText(ru.imageCarousel.labelRemove)).toHaveLength(
      filesFixture.length
    );
    expect(component.getAllByLabelText(ru.imageCarousel.labelView)).toHaveLength(
      filesFixture.length
    );
    expect(component.getByLabelText(ru.imageCarousel.labelSlideLeft)).toBeInTheDocument();
    expect(component.getByLabelText(ru.imageCarousel.labelSlideRight)).toBeInTheDocument();
  });

  it('Should emit view on view button click', async () => {
    const onView = jest.fn();
    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture,
        canView: true,
        view: {
          emit: onView
        } as any
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    component.getAllByLabelText(en.imageCarousel.labelView).forEach((btn) => {
      component.click(btn);
    });
    expect(onView).toHaveBeenCalledTimes(filesFixture.length);
  });

  it('Should emit remove on remove button click', async () => {
    const onRemove = jest.fn();
    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture,
        canRemove: true,
        remove: {
          emit: onRemove
        } as any
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    component.getAllByLabelText(en.imageCarousel.labelRemove).forEach((btn) => {
      component.click(btn);
    });
    expect(onRemove).toHaveBeenCalledTimes(filesFixture.length);
  });
});
