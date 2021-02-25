import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ESAvatarGroupComponent } from './avatar-group.component';
import { ESAvatarModule } from '../../avatar.module';

@NgModule({
  declarations: [ESAvatarGroupComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [ESAvatarGroupComponent]
})
export class ESAvatarGroupModule {}
