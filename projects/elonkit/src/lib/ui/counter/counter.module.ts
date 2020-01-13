import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [CounterComponent]
})
export class ESCounterModule {}
