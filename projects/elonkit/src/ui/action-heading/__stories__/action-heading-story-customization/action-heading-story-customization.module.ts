import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionHeadingStoryCustomizationComponent } from './action-heading-story-customization.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ESActionHeadingModule } from '../../action-heading.module';

@NgModule({
  imports: [CommonModule, MatIconModule, MatButtonModule, ESActionHeadingModule],
  declarations: [ActionHeadingStoryCustomizationComponent],
  exports: [ActionHeadingStoryCustomizationComponent]
})
export class ActionHeadingStoryCustomizationModule {}
