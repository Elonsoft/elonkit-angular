import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryCustomComponent } from './avatar-story-custom.component';
import { ESAvatarModule } from '../..';

@NgModule({
  declarations: [AvatarStoryCustomComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [AvatarStoryCustomComponent]
})
export class AvatarStoryCustomModule {}
