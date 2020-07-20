import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESAlertLocale {
  labelClose = 'Close';
}

@Injectable()
export class ESAlertLocaleRU extends ESAlertLocale {
  labelClose = 'Закрыть';
}
