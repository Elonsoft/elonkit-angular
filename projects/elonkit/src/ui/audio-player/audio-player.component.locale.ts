import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESAudioPlayerLocale {
  labelSpeed = 'Speed';
  labelDownload = 'Download';
  labelBack = 'Back';
  labelNormal = 'Normal';
}

@Injectable()
export class ESAudioPlayerLocaleRU extends ESAudioPlayerLocale {
  labelSpeed = 'Скорость';
  labelDownload = 'Скачать';
  labelBack = 'Назад';
  labelNormal = 'Обычная';
}
