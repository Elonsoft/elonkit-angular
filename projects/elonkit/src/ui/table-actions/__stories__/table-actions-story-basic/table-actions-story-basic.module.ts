import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableActionsStoryBasicComponent } from './table-actions-story-basic.component';
import { ESTableActionsModule } from '../../';

@NgModule({
  declarations: [TableActionsStoryBasicComponent],
  imports: [CommonModule, ESTableActionsModule, MatTableModule, MatIconModule, MatButtonModule],
  exports: [TableActionsStoryBasicComponent]
})
export class TableActionsStoryBasicModule {}
