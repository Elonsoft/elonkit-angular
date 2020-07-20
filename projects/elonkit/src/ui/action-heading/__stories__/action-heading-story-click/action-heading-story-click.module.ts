import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ESActionHeadingModule } from '../../action-heading.module';
import { ActionHeadingStoryClickComponent } from './action-heading-story-click.component';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, ESActionHeadingModule],
  declarations: [ActionHeadingStoryClickComponent],
  exports: [ActionHeadingStoryClickComponent]
})
export class ActionHeadingStoryClickModule {}
