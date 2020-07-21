import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESImageCarouselLocale {
  labelView = 'View';
  labelRemove = 'Remove';
  labelSlideRight = 'Slide right';
  labelSlideLeft = 'Slide left';
}

@Injectable()
export class ESImageCarouselLocaleRU extends ESImageCarouselLocale {
  labelView = 'Смотреть';
  labelRemove = 'Удалить';
  labelSlideRight = 'Передвинуть вправо';
  labelSlideLeft = 'Передвинуть влево';
}
