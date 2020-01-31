import { Injectable } from '@angular/core';

@Injectable()
export class ESTimepickerLocale {
  labelHH: string;
  labelMM: string;
  labelSS: string;
}

export class ESTimepickerLocaleEN extends ESTimepickerLocale {
  labelHH = 'HH';
  labelMM = 'MM';
  labelSS = 'SS';
}

export class ESTimepickerLocaleRU extends ESTimepickerLocale {
  labelHH = 'ЧЧ';
  labelMM = 'ММ';
  labelSS = 'СС';
}
