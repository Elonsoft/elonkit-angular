import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryBasicComponent } from './avatar-story-basic.component';
import { ESAvatarModule } from '../..';

@NgModule({
  declarations: [AvatarStoryBasicComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [AvatarStoryBasicComponent]
})
export class AvatarStoryBasicModule {}
