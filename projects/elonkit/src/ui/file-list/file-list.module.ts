import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ESFileListComponent } from './file-list.component';

@NgModule({
  declarations: [ESFileListComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ESFileListComponent]
})
export class ESFileListModule {}
