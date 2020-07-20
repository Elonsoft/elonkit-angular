import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AlertStoryIconMappingComponent } from './alert-story-icon-mapping.component';

import { ESAlertModule, ES_ALERT_DEFAULT_OPTIONS } from '../..';

@NgModule({
  declarations: [AlertStoryIconMappingComponent],
  imports: [CommonModule, HttpClientModule, ESAlertModule],
  exports: [AlertStoryIconMappingComponent],
  providers: [
    {
      provide: ES_ALERT_DEFAULT_OPTIONS,
      useValue: {
        iconMapping: {
          warning: { svgIcon: 'warning' },
          error: { svgIcon: 'error' }
        }
      }
    }
  ]
})
export class AlertStoryIconMappingModule {}
