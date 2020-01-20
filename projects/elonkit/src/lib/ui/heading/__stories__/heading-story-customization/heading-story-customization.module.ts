import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ESHeadingModule } from '../../heading.module';
import { HeadingStoryCustomizationComponent } from './heading-story-customization.component';

@NgModule({
  declarations: [HeadingStoryCustomizationComponent],
  imports: [CommonModule, ESHeadingModule],
  exports: [HeadingStoryCustomizationComponent]
})
export class HeadingStoryCustomizationModule {}
