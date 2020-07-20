import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ESEmptyStateComponent } from './empty-state.component';

@NgModule({
  declarations: [ESEmptyStateComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESEmptyStateComponent]
})
export class ESEmptyStateModule {}
