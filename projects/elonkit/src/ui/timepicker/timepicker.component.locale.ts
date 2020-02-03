import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESTimepickerLocale {
  labelHH = 'HH';
  labelMM = 'MM';
  labelSS = 'SS';
}

export class ESTimepickerLocaleRU extends ESTimepickerLocale {
  labelHH = 'ЧЧ';
  labelMM = 'ММ';
  labelSS = 'СС';
}
