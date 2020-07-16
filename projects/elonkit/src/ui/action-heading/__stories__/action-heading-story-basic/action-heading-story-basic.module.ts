import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionHeadingStoryBasicComponent } from './action-heading-story-basic.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ESActionHeadingModule } from '../../action-heading.module';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, ESActionHeadingModule],
  declarations: [ActionHeadingStoryBasicComponent],
  exports: [ActionHeadingStoryBasicComponent]
})
export class ActionHeadingStoryBasicModule {}
