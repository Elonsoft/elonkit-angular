import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { en } from './locales';
export type ESLocale = typeof en;

const DEFAULT_LANGUAGE = 'en';

@Injectable({ providedIn: 'root' })
export class ESLocaleService {
  private _language = new BehaviorSubject<string>(DEFAULT_LANGUAGE);
  private _locales: { [language: string]: ESLocale } = {};

  constructor() {
    this.register('en', en);
  }

  public register(language: string, locale: ESLocale) {
    this._locales[language] = locale;
  }

  public use(language: string) {
    if (language === this.currentLanguage()) {
      return;
    }

    this._language.next(language);
  }

  public languageChange() {
    return this._language.asObservable();
  }

  public language() {
    return this._language.getValue();
  }

  public locale() {
    return this._language.pipe(map((language) => this._locales[language]));
  }

  public currentLanguage() {
    return this._language.getValue();
  }

  public currentLocale() {
    return this._locales[this.currentLanguage()];
  }
}
