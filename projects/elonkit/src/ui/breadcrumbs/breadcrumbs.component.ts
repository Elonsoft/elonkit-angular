import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { ESBreadcrumbsService } from './breadcrumbs.service';

const SIZE_ICON = 24;
const SIZE_ICON_MAGRIN = 4;
const SIZE_SEPARATOR = 40;
const SIZE_MENU = 20;
const SIZE_COLLAPSE = 24;

@Component({
  selector: 'es-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsComponent implements OnInit, OnDestroy {
  @ViewChild('navigation', { static: true }) elementNavigation: ElementRef<HTMLElement>;
  @ViewChild('width', { static: true }) elementWidth: ElementRef<HTMLElement>;

  @HostListener('window:resize') onResize() {
    const element = this.elementNavigation.nativeElement;
    if (element && this.breadcrumbs.length > 2) {
      const widths = this.breadcrumbs.map(({ data: { text, icon, breadcrumbs } }) => {
        let result = 0;
        if (text) {
          result += this.getTextWidth(text);
        }
        if (icon) {
          result += SIZE_ICON;
        }
        if (text && icon) {
          result += SIZE_ICON_MAGRIN;
        }
        if (breadcrumbs) {
          result += SIZE_MENU;
        }
        return result;
      });

      let scrollWidth =
        widths.reduce((acc, w) => acc + w, 0) + SIZE_SEPARATOR * (widths.length - 1);
      const clientWidth = element.clientWidth;

      const collapseIndexes = [];
      const collapseBreadcrumbs = [];

      for (let i = 1; i < widths.length - 1 && scrollWidth > clientWidth; i++) {
        if (!collapseIndexes.length) {
          scrollWidth += SIZE_COLLAPSE + SIZE_SEPARATOR;
        }

        collapseIndexes.push(i);
        collapseBreadcrumbs.push(this.breadcrumbs[i]);
        scrollWidth -= widths[i] + SIZE_SEPARATOR;
      }

      this.collapseIndexes = collapseIndexes;
      this.collapseBreadcrumbs = collapseBreadcrumbs;
    } else if (this.collapseIndexes.length) {
      this.collapseIndexes = [];
      this.collapseBreadcrumbs = [];
    }
  }

  public breadcrumbs = [];

  public collapseIndexes = [];
  public collapseBreadcrumbs = [];

  private destroyed$ = new Subject();

  constructor(
    private chageDetector: ChangeDetectorRef,
    private breadcrumbsService: ESBreadcrumbsService
  ) {}

  ngOnInit() {
    this.breadcrumbsService.breadcrumbs$
      .pipe(takeUntil(this.destroyed$), delay(1))
      .subscribe(breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
        this.onResize();
        this.chageDetector.detectChanges();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  private getTextWidth(text: string) {
    const container = this.elementWidth.nativeElement;
    container.textContent = text;
    return container.clientWidth + 1;
  }
}
