import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ESBreadcrumbsComponent } from './breadcrumbs.component';
import { ESBreadcrumbsResolver } from './breadcrumbs.resolver';

@NgModule({
  declarations: [ESBreadcrumbsComponent],
  imports: [CommonModule, RouterModule],
  exports: [ESBreadcrumbsComponent],
  providers: [ESBreadcrumbsResolver]
})
export class ESBreadcrumbsModule {}
