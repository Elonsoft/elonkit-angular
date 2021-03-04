import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvatarStoryNoImageTypographyComponent } from './avatar-story-no-image-typography.component';
import { ESAvatarModule } from '../..';

@NgModule({
  declarations: [AvatarStoryNoImageTypographyComponent],
  imports: [CommonModule, ESAvatarModule],
  exports: [AvatarStoryNoImageTypographyComponent]
})
export class AvatarStoryNoImageTypographyModule {}
