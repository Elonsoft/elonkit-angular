import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESAudioPlayerLocale {
  public labelSpeed = 'Speed';
  public labelDownload = 'Download';
  public labelBack = 'Back';
  public labelNormal = 'Normal';
}

@Injectable()
export class ESAudioPlayerLocaleRU extends ESAudioPlayerLocale {
  public labelSpeed = 'Скорость';
  public labelDownload = 'Скачать';
  public labelBack = 'Назад';
  public labelNormal = 'Обычная';
}
