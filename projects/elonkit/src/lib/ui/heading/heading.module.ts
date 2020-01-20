import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HeadingComponent } from './heading.component';

@NgModule({
  declarations: [HeadingComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, RouterModule],
  exports: [HeadingComponent]
})
export class ESHeadingModule {}
