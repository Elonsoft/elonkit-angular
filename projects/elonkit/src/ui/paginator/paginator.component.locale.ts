import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESPaginatorLocale {
  public labelItemsPerPage = 'Items per page';
  public labelOf = 'of';
  public labelPrev = 'Previous page';
  public labelNext = 'Next page';
  public labelGoTo = 'Go to page';
  public labelPage = 'page';
}

@Injectable()
export class ESPaginatorLocaleRU extends ESPaginatorLocale {
  public labelItemsPerPage = 'Показывать по';
  public labelOf = 'из';
  public labelPrev = 'Предыдущая страница';
  public labelNext = 'Следующая страница';
  public labelGoTo = 'Перейти на страницу';
  public labelPage = 'стр';
}
