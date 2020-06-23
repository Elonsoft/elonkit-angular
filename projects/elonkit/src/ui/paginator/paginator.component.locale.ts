import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESPaginatorLocale {
  labelItemsPerPage = 'Items per page';
  labelOf = 'of';
  labelPrev = 'Previous page';
  labelNext = 'Next page';
  labelGoTo = 'Go to page';
  labelPage = 'page';
}

@Injectable()
export class ESPaginatorLocaleRU extends ESPaginatorLocale {
  labelItemsPerPage = 'Показывать по';
  labelOf = 'из';
  labelPrev = 'Предыдущая страница';
  labelNext = 'Следующая страница';
  labelGoTo = 'Перейти на страницу';
  labelPage = 'стр';
}
