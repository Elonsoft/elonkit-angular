import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ESDragAndDropComponent } from './drag-and-drop.component';
import { HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ESDragAndDropComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatRippleModule,
    HttpClientModule
  ],
  exports: [ESDragAndDropComponent]
})
export class ESDragAndDropModule {}
