import { render } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { ESImageCarouselComponent } from '../image-carousel.component';
import { ESImageCarouselModule } from '../image-carousel.module';
import { filesFixture } from '../fixtures/files.fixture';
import { ESImageCarouselLocale, ESImageCarouselLocaleRU } from '../image-carousel.component.locale';

const locale = new ESImageCarouselLocale();
const localeRU = new ESImageCarouselLocaleRU();

describe('Image Carousel', () => {
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
    expect(component.getAllByLabelText(locale.labelRemove)).toHaveLength(filesFixture.length);
    expect(component.getAllByLabelText(locale.labelView)).toHaveLength(filesFixture.length);
    expect(component.getByLabelText(locale.labelSlideLeft)).toBeInTheDocument();
    expect(component.getByLabelText(locale.labelSlideRight)).toBeInTheDocument();
  });

  it('Should change locale', async () => {
    const component = await render(ESImageCarouselComponent, {
      componentProperties: {
        files: filesFixture,
        canView: true,
        canRemove: true
      },
      imports: [ESImageCarouselModule, MatIconTestingModule],
      providers: [{ provide: ESImageCarouselLocale, useClass: ESImageCarouselLocaleRU }],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByLabelText(localeRU.labelRemove)).toHaveLength(filesFixture.length);
    expect(component.getAllByLabelText(localeRU.labelView)).toHaveLength(filesFixture.length);
    expect(component.getByLabelText(localeRU.labelSlideLeft)).toBeInTheDocument();
    expect(component.getByLabelText(localeRU.labelSlideRight)).toBeInTheDocument();
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
    component.getAllByLabelText(locale.labelView).forEach(btn => {
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
    component.getAllByLabelText(locale.labelRemove).forEach(btn => {
      component.click(btn);
    });
    expect(onRemove).toHaveBeenCalledTimes(filesFixture.length);
  });
});
