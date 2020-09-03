import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESAlertLocale {
  public labelClose = 'Close';
}

@Injectable()
export class ESAlertLocaleRU extends ESAlertLocale {
  public labelClose = 'Закрыть';
}
