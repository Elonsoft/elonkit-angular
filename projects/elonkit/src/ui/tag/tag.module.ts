import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ESTagComponent } from './tag.component';

@NgModule({
  imports: [CommonModule, MatIconModule],
  declarations: [ESTagComponent],
  exports: [ESTagComponent]
})
export class ESTagModule {}
