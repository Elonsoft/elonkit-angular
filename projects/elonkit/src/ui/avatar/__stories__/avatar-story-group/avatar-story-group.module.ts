import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryGroupComponent } from './avatar-story-group.component';
import { ESAvatarModule } from '../..';

@NgModule({
  declarations: [AvatarStoryGroupComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [AvatarStoryGroupComponent]
})
export class AvatarStoryGroupModule {}
