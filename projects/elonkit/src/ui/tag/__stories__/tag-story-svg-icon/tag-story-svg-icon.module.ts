import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TagStorySvgIconComponent } from './tag-story-svg-icon.component';
import { ESTagModule } from '../..';

@NgModule({
  declarations: [TagStorySvgIconComponent],
  imports: [CommonModule, HttpClientModule, ESTagModule],
  exports: [TagStorySvgIconComponent]
})
export class TagStorySvgIconModule {}
