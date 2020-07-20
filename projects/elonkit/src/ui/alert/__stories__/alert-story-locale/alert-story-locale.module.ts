import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertStoryLocaleComponent } from './alert-story-locale.component';

import { ESAlertModule, ESAlertLocale, ESAlertLocaleRU } from '../..';

@NgModule({
  declarations: [AlertStoryLocaleComponent],
  imports: [CommonModule, ESAlertModule],
  exports: [AlertStoryLocaleComponent],
  providers: [{ provide: ESAlertLocale, useClass: ESAlertLocaleRU }]
})
export class AlertStoryLocaleModule {}
