import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESBadgeComponent } from './badge.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, HttpClientModule, MatIconModule, MatButtonModule],
  declarations: [ESBadgeComponent],
  exports: [ESBadgeComponent]
})
export class ESBadgeModule {}
