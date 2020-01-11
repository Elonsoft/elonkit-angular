import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { CounterComponent } from './counter.component';

@NgModule({
  declarations: [CounterComponent],
  imports: [MatButtonModule, MatIconModule],
  exports: [CounterComponent]
})
export class ESCounterModule {}
