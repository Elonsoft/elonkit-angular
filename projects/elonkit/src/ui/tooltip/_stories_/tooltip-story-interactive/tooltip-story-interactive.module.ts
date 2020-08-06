import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { TooltipStoryInteractiveComponent } from './tooltip-story-interactive.component';

import { ESTooltipModule } from '../..';

@NgModule({
  declarations: [TooltipStoryInteractiveComponent],
  imports: [CommonModule, MatButtonModule, ESTooltipModule],
  exports: [TooltipStoryInteractiveComponent]
})
export class TooltipStoryInteractiveModule {}
