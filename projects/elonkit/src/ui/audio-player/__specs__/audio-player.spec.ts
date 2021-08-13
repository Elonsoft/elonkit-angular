import { OverlayContainer } from '@angular/cdk/overlay';
import { inject } from '@angular/core/testing';
import { MatIconTestingModule } from '@angular/material/icon/testing';

import { fireEvent, getByLabelText, render, RenderResult, screen } from '@testing-library/angular';
import { en } from '../../locale';
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
      imports: [MatIconTestingModule, ESAudioPlayerModule],
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

    jest.restoreAllMocks();
  }));

  it('Should change volume', async () => {
    fireEvent.click(screen.getByLabelText(en.audioPlayer.labelMute));

    expect(onVolumeChanged).toBeCalledWith(0);

    fireEvent.click(screen.getByLabelText(en.audioPlayer.labelUnmute));

    expect(onVolumeChanged).toBeCalledWith(VOLUME);
  });

  it('Should download audio', async () => {
    fireEvent.mouseEnter(screen.getByLabelText(en.audioPlayer.labelOptions));

    fireEvent.click(getByLabelText(overlayElement, en.audioPlayer.labelDownload));

    expect(onDownloadAudio).toBeCalled();
  });
});
