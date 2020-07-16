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
    expect(component.getAllByTestId('file')).toHaveLength(filesFixture.length);
  });

  it('Should render remove button on canRemove input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        options: {
          canRemove: true
        }
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByLabelText('Remove')).toHaveLength(filesFixture.length);
  });

  it('Should remove file on remove button click', async () => {
    const onRemove = jest.fn();
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        options: {
          canRemove: true
        },
        remove: {
          emit: onRemove
        } as any
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const removeButtons = component.getAllByLabelText('Remove');
    removeButtons.forEach(btn => {
      component.click(btn);
    });
    expect(onRemove).toHaveBeenCalledTimes(filesFixture.length);
  });

  it('Should render download icon on canDownload input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        options: {
          canDownload: true
        }
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    expect(component.getAllByLabelText('Download')).toHaveLength(filesFixture.length);
  });

  it('Should download file on download icon click', async () => {
    const onDownload = jest.fn();
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        options: {
          canDownload: true
        },
        download: {
          emit: onDownload
        } as any
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const downloadButtons = component.getAllByLabelText('Download');
    downloadButtons.forEach(btn => {
      component.click(btn);
    });
    expect(onDownload).toHaveBeenCalledTimes(filesFixture.length);
  });

  it('Should not render image files on hideImages input', async () => {
    const component = await render(ESFileListComponent, {
      componentProperties: {
        files: filesFixture,
        options: {
          hideImages: true
        }
      },
      imports: [ESFileListModule, MatIconTestingModule],
      excludeComponentDeclaration: true
    });
    const nonImageFixture = filesFixture.filter(file => !file.type.startsWith('image'));
    expect(component.getAllByTestId('file')).toHaveLength(nonImageFixture.length);
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
    expect(component.getAllByText('КБ', { exact: false })).toHaveLength(filesFixture.length);
  });
});
