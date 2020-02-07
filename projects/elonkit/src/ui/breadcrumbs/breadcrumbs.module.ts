import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { ESBreadcrumbsComponent } from './breadcrumbs.component';
import { ESBreadcrumbsResolver } from './breadcrumbs.resolver';

import { ESBreadcrumbsBreadcrumbComponent } from './components/breadcrumbs-breadcrumb';

@NgModule({
  declarations: [ESBreadcrumbsComponent, ESBreadcrumbsBreadcrumbComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule],
  exports: [ESBreadcrumbsComponent],
  providers: [ESBreadcrumbsResolver]
})
export class ESBreadcrumbsModule {}
