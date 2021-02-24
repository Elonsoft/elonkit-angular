import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryGroupComponent } from './avatar-story-group.component';
import { ESAvatarGroupModule } from '../../components/';

@NgModule({
  declarations: [AvatarStoryGroupComponent],
  imports: [CommonModule, ESAvatarGroupModule],
  exports: [AvatarStoryGroupComponent]
})
export class AvatarStoryGroupModule {}
