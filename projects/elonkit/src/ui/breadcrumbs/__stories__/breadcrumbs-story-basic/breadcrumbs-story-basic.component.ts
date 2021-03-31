import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Input
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'es-breadcrumbs-basic',
  template: `
    <es-breadcrumbs [withBackButton]="withBackButton"></es-breadcrumbs>
    <br />
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicComponent implements OnInit {
  @Input() public withBackButton: boolean;

  constructor(
    private router: Router,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitizer.bypassSecurityTrustResourceUrl('/icons/home.svg')
    );
  }

  public ngOnInit() {
    // Hack for RouterTestingModule
    this.router.navigate(['/categories']);
  }
}

@Component({
  selector: 'es-breadcrumbs-basic-home',
  template: `
    <h1 class="mat-h1">Home</h1>
    <a [routerLink]="['categories']"> Categories </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicHomeComponent {}

@Component({
  selector: 'es-breadcrumbs-basic-categories-list',
  template: `
    <h1 class="mat-h1">Categories</h1>
    <ul>
      <li *ngFor="let category of categories">
        <a [routerLink]="[category.id]">
          {{ category.title }}
        </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicCategoriesListComponent {
  public categories = [];

  constructor(private route: ActivatedRoute) {
    this.categories = this.route.snapshot.data.data;
  }
}

@Component({
  selector: 'es-breadcrumbs-basic-items-list',
  template: `
    <h1 class="mat-h1">Items</h1>
    <ul>
      <li *ngFor="let item of items">
        <a [routerLink]="[item.id]">
          {{ item.title }}
        </a>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicItemsListComponent implements OnInit, OnDestroy {
  public items = [];
  public destroyed$ = new Subject();

  constructor(private changeDetector: ChangeDetectorRef, private route: ActivatedRoute) {}

  public ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.items = this.route.snapshot.data.data;
      this.changeDetector.detectChanges();
    });
  }

  public ngOnDestroy() {
    this.destroyed$.next();
  }
}

@Component({
  selector: 'es-breadcrumbs-basic-items-show',
  template: `
    <h1 class="mat-h1">{{ item.title }}</h1>
    <a [routerLink]="['edit']">Edit</a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicItemsShowComponent {
  public item;

  constructor(private route: ActivatedRoute) {
    this.item = this.route.snapshot.data.data;
  }
}

@Component({
  selector: 'es-breadcrumbs-basic-items-edit',
  template: ` <h1 class="mat-h1">Edit {{ item.title }}</h1> `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbsStoryBasicItemsEditComponent {
  public item;

  constructor(private route: ActivatedRoute) {
    this.item = this.route.snapshot.data.data;
  }
}
