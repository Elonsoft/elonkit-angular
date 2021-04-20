import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ESTableActionsComponent } from './table-actions.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatIconModule, HttpClientModule],
  exports: [ESTableActionsComponent],
  declarations: [ESTableActionsComponent]
})
export class ESTableActionsModule {}
