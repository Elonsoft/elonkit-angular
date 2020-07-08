import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESAlertComponent } from './alert.component';
import { ESAlertActionsComponent } from './components/alert-actions';

@NgModule({
  declarations: [ESAlertComponent, ESAlertActionsComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESAlertComponent, ESAlertActionsComponent, MatButtonModule]
})
export class ESAlertModule {}
