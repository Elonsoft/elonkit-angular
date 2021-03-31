import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { ESAvatarComponent } from './avatar.component';
import { ESAvatarGroupComponent } from './avatar-group.component';

@NgModule({
  declarations: [ESAvatarComponent, ESAvatarGroupComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ESAvatarComponent, ESAvatarGroupComponent]
})
export class ESAvatarModule {}
