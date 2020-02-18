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

import { IBreadcrumb } from './breadcrumbs.types';
import { ESBreadcrumbsService } from './breadcrumbs.service';

const SIZE_ICON = 24;
const SIZE_ICON_MAGRIN = 4;
const SIZE_SEPARATOR = 44;
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
  /**
   * @internal
   * @ignore
   */
  @ViewChild('navigation', { static: true }) elementNavigation: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  @ViewChild('width', { static: true }) elementWidth: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  @HostListener('window:resize') onResize() {
    const element = this.elementNavigation.nativeElement;
    if (element && this.breadcrumbs.length > 2) {
      const widths = this.breadcrumbs.map(({ data: { label, icon, breadcrumbs } }) => {
        let result = 0;
        if (label) {
          result += this.getLabelWidth(label);
        }
        if (icon) {
          result += SIZE_ICON;
        }
        if (label && icon) {
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

  /**
   * @internal
   * @ignore
   */
  public breadcrumbs: IBreadcrumb[] = [];

  /**
   * @internal
   * @ignore
   */
  public collapseIndexes: number[] = [];

  /**
   * @internal
   * @ignore
   */
  public collapseBreadcrumbs: IBreadcrumb[] = [];

  private destroyed$ = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breadcrumbsService: ESBreadcrumbsService
  ) {}

  /**
   * @internal
   * @ignore
   */
  public ngOnInit() {
    this.breadcrumbsService.breadcrumbs$
      .pipe(takeUntil(this.destroyed$), delay(1))
      .subscribe(breadcrumbs => {
        this.breadcrumbs = breadcrumbs;
        this.onResize();
        this.changeDetector.detectChanges();
      });
  }

  /**
   * @internal
   * @ignore
   */
  public ngOnDestroy() {
    this.destroyed$.next();
  }

  private getLabelWidth(text: string) {
    const container = this.elementWidth.nativeElement;
    container.textContent = text;
    return container.clientWidth + 1;
  }
}
