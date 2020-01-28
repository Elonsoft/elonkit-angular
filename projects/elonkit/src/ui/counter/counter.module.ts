import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESCounterComponent } from './counter.component';

@NgModule({
  declarations: [ESCounterComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESCounterComponent]
})
export class ESCounterModule {}
