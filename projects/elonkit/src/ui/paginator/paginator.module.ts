import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { ESPaginatorComponent } from './paginator.component';
import { ESTooltipModule } from '../tooltip';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ESTooltipModule
  ],
  exports: [ESPaginatorComponent],
  declarations: [ESPaginatorComponent]
})
export class ESPaginatorModule {}
