import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESImageCarouselLocale {
  labelView = 'View';
  labelRemove = 'Remove';
}

@Injectable()
export class ESImageCarouselLocaleRU extends ESImageCarouselLocale {
  labelView = 'Смотреть';
  labelRemove = 'Удалить';
}
