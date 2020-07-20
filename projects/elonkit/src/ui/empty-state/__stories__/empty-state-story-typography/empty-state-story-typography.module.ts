import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmptyStateStoryTypographyComponent } from './empty-state-story-typography.component';
import { ESEmptyStateModule } from '../..';

@NgModule({
  declarations: [EmptyStateStoryTypographyComponent],
  imports: [CommonModule, ESEmptyStateModule],
  exports: [EmptyStateStoryTypographyComponent]
})
export class EmptyStateStoryTypographyModule {}
