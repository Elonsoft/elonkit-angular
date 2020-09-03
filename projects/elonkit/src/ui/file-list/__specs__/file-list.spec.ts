import { render } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { ESFileListModule } from '../file-list.module';
import { ESFileListComponent } from '../file-list.component';
import { filesFixture } from '../fixtures/files.fixture';
import { ESFileListLocale, ESFileListLocaleRU } from '../file-list.component.locale';

const locale = new ESFileListLocale();
const localeRU = new ESFileListLocaleRU();

describe('File List', () => {
  it('Should render all files', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByTestId('file')).toHaveLength(filesFixture.length);
  });

  it('Should accept typography classes', async () => {
    const file = filesFixture[0];
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: [file],
        fileNameTypography: 'app-body-1',
        fileSizeTypography: 'app-caption'
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.getByText(file.name)).toHaveClass('app-body-1');
    expect(component.getByText(locale.labelKB, { exact: false })).toHaveClass('app-caption');
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
    expect(component.getAllByLabelText(locale.labelRemove)).toHaveLength(filesFixture.length);
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
    const removeButtons = component.getAllByLabelText(locale.labelRemove);
    removeButtons.forEach((btn) => {
      component.click(btn);
    });
    expect(onRemove).toHaveBeenCalledTimes(filesFixture.length);
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
    expect(component.getAllByLabelText(locale.labelDownload)).toHaveLength(filesFixture.length);
  });

  it('Should download file on download icon click', async () => {
    const onDownload = jest.fn();
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canDownload: true,
        download: {
          emit: onDownload
        } as any
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const downloadButtons = component.getAllByLabelText(locale.labelDownload);
    downloadButtons.forEach((btn) => {
      component.click(btn);
    });
    expect(onDownload).toHaveBeenCalledTimes(filesFixture.length);
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
    const nonImageFixture = filesFixture.filter((file) => !file.type.startsWith('image'));
    expect(component.getAllByTestId('file')).toHaveLength(nonImageFixture.length);
  });

  it('Should change locale', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        canDownload: true,
        canRemove: true
      },
      imports: [ESFileListModule, MatIconTestingModule],
      providers: [{ provide: ESFileListLocale, useClass: ESFileListLocaleRU }],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByLabelText(localeRU.labelDownload)).toHaveLength(filesFixture.length);
    expect(component.getAllByLabelText(localeRU.labelRemove)).toHaveLength(filesFixture.length);
    expect(component.getAllByText(localeRU.labelKB, { exact: false })).toHaveLength(
      filesFixture.length
    );
  });
});
