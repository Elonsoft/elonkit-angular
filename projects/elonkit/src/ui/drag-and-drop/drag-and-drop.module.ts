import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ESDragAndDropComponent } from './drag-and-drop.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ESDragAndDropComponent],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSnackBarModule, HttpClientModule],
  exports: [ESDragAndDropComponent]
})
export class ESDragAndDropModule {}
