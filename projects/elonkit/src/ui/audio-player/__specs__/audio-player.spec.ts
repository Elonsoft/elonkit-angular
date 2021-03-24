import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { inject } from '@angular/core/testing';

import { getByTestId, render, RenderResult } from '@testing-library/angular';

import { CoreModule } from '~storybook/core.module';

import { ESAudioPlayerComponent } from '../audio-player.component';
import { ESAudioPlayerModule } from '../audio-player.module';

const VOLUME = 46;

describe('AudioPlayer', () => {
  let overlay: OverlayContainer;
  let overlayElement: HTMLElement;
  let component: RenderResult<ESAudioPlayerComponent>;

  const onDownloadAudio = jest.fn();
  const onVolumeChanged = jest.fn();

  beforeEach(async () => {
    component = await render(ESAudioPlayerComponent, {
      componentProperties: {
        volume: VOLUME,
        audioDownload: { emit: onDownloadAudio } as any,
        volumeChanged: { emit: onVolumeChanged } as any
      },
      imports: [HttpClientModule, CoreModule, ESAudioPlayerModule],
      excludeComponentDeclaration: true
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

  it('Should change volume', async () => {
    component.click(component.getByTestId('volume'));

    expect(onVolumeChanged).toBeCalledWith(0);

    component.click(component.getByTestId('volume'));

    expect(onVolumeChanged).toBeCalledWith(VOLUME);
  });

  it('Should download audio', async () => {
    component.mouseEnter(component.getByTestId('options'));

    component.click(getByTestId(overlayElement, 'download'));

    expect(onDownloadAudio).toBeCalled();
  });
});
