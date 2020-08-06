import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { TooltipStoryBasicComponent } from './tooltip-story-basic.component';

import { ESTooltipModule } from '../..';

@NgModule({
  declarations: [TooltipStoryBasicComponent],
  imports: [CommonModule, MatButtonModule, ESTooltipModule],
  exports: [TooltipStoryBasicComponent]
})
export class TooltipStoryBasicModule {}
