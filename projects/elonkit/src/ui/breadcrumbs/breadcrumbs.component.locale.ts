import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESBreadcrumbsLocale {
  labelMore = 'More';
}

@Injectable()
export class ESBreadcrumbsLocaleRU extends ESBreadcrumbsLocale {
  labelMore = 'Ещё';
}
