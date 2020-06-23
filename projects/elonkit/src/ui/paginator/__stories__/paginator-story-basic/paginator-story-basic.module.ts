import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorStoryBasicComponent } from './paginator-story-basic.component';

import { ESPaginatorModule } from '../..';

@NgModule({
  declarations: [PaginatorStoryBasicComponent],
  imports: [CommonModule, ESPaginatorModule],
  exports: [PaginatorStoryBasicComponent]
})
export class PaginatorStoryBasicModule {}
