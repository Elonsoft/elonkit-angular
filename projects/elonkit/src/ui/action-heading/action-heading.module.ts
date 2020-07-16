import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESActionHeadingComponent } from './action-heading.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule],
  declarations: [ESActionHeadingComponent],
  exports: [ESActionHeadingComponent]
})
export class ESActionHeadingModule {}
