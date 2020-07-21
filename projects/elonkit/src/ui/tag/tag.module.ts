import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESTagComponent } from './tag.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ESTagComponent],
  exports: [ESTagComponent]
})
export class ESTagModule {}
