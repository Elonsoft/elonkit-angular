import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryTypographyComponent } from './avatar-story-typography.component';
import { ESAvatarModule } from '../..';

@NgModule({
  declarations: [AvatarStoryTypographyComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [AvatarStoryTypographyComponent]
})
export class AvatarStoryTypographyModule {}
