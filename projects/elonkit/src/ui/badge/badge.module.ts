import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { ESBadgeComponent } from './badge.component';

@NgModule({
  declarations: [ESBadgeComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESBadgeComponent]
})
export class ESBadgeModule {}
