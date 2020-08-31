import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESTimepickerLocale {
  public labelHH = 'HH';
  public labelMM = 'MM';
  public labelSS = 'SS';
}

@Injectable()
export class ESTimepickerLocaleRU extends ESTimepickerLocale {
  public labelHH = 'ЧЧ';
  public labelMM = 'ММ';
  public labelSS = 'СС';
}
