import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ESAvatarComponent } from './avatar.component';

// TODO: Add FallbackImageModule
@NgModule({
  declarations: [ESAvatarComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESAvatarComponent]
})
export class ESAvatarModule {}
