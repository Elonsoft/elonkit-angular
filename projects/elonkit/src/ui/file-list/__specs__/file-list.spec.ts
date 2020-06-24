import { render } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { ESFileListModule } from '../file-list.module';
import { ESFileListComponent } from '../file-list.component';
import { filesFixture } from '../fixtures/files.fixture';
import { ESFileListLocale, ESFileListLocaleRU } from '../file-list.component.locale';

describe('File List', () => {
  it('Should render all files', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.container.querySelectorAll('.file-list__file')).toHaveLength(
      filesFixture.length
    );
  });

  it('Should render remove button on canRemove input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canRemove: true
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.container.querySelector('.file-list__remove')).toBeInTheDocument();
  });

  it('Should remove file on remove button click', async () => {
    const onRemove = jest.fn();
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canRemove: true,
        remove: {
          emit: onRemove
        } as any
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const removeButton = component.container.querySelector('.file-list__remove');
    component.click(removeButton);
    expect(onRemove).toHaveBeenCalled();
  });

  it('Should render download icon on canDownload input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canDownload: true
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.container.querySelector('.file-list__icon_download')).toBeInTheDocument();
  });

  it('Should download file on download icon click', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canDownload: true
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const componentInstance = component.fixture.componentInstance;
    spyOn(componentInstance, 'downloadFile').and.returnValue(true);
    component.click(component.container.querySelector('.file-list__icon_download'));
    expect(componentInstance.downloadFile).toHaveBeenCalled();
  });

  it('Should not render image files on hideImages input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        hideImages: true
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.container.querySelectorAll('.file-list__file')).toHaveLength(1);
  });

  it('Should change locale', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture
      },
      imports: [ESFileListModule, MatIconTestingModule],
      providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }],
      excludeComponentDeclaration: true
    });
    expect(
      component.container.querySelector('.file-list__subtitle-size').textContent.includes('КБ')
    ).toBeTruthy();
  });
});
