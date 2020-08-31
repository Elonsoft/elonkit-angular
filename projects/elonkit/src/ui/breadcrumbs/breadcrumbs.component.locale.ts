import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESBreadcrumbsLocale {
  public labelMore = 'More';
}

@Injectable()
export class ESBreadcrumbsLocaleRU extends ESBreadcrumbsLocale {
  public labelMore = 'Ещё';
}
