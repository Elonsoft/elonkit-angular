import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESImageCarouselLocale {
  public labelView = 'View';
  public labelRemove = 'Remove';
  public labelSlideRight = 'Slide right';
  public labelSlideLeft = 'Slide left';
}

@Injectable()
export class ESImageCarouselLocaleRU extends ESImageCarouselLocale {
  public labelView = 'Смотреть';
  public labelRemove = 'Удалить';
  public labelSlideRight = 'Передвинуть вправо';
  public labelSlideLeft = 'Передвинуть влево';
}
