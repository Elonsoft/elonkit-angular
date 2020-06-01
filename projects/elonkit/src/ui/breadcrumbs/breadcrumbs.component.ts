import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  HostListener,
  ViewChild,
  ElementRef,
  OnInit,
  OnDestroy,
  AfterContentInit,
  InjectionToken,
  Optional,
  Inject,
  Input,
  ContentChild,
  TemplateRef
} from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { ESBreadcrumb } from './breadcrumbs.types';
import { ESBreadcrumbsService } from './breadcrumbs.service';

import { ESBreadcrumbsMoreDirective } from './directives/breadcrumbs-more.directive';
import { ESBreadcrumbsSeparatorDirective } from './directives/breadcrumbs-separator.directive';

export interface ESBreadcrumbsDefaultOptionsSizes {
  itemPadding: number;
  icon: number;
  iconMargin: number;
  menu: number;
  separator: number;
  more: number;
}

export interface ESBreadcrumbsDefaultOptions {
  typography?: string;
  sizes?: ESBreadcrumbsDefaultOptionsSizes;
}

export const ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY = 'mat-caption';

export const ES_BREADCRUMBS_DEFAULT_SIZES = {
  itemPadding: 8,
  icon: 24,
  iconMargin: 4,
  menu: 20,
  separator: 16,
  more: 24
};

export const ES_BREADCRUMBS_DEFAULT_OPTIONS = new InjectionToken<ESBreadcrumbsDefaultOptions>(
  'ES_BREADCRUMBS_DEFAULT_OPTIONS'
);

@Component({
  selector: 'es-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ESBreadcrumbsComponent implements OnInit, OnDestroy, AfterContentInit {
  private _typography;

  /**
   * Class applied to breadcrumb labels.
   */
  @Input()
  get typography(): string {
    return this._typography;
  }
  set typography(value: string) {
    this._typography =
      value || this.defaultOptions?.typography || ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY;
  }

  private _sizes;

  /**
   * Sizes of component elements which are used for collapse calculations.
   */
  @Input()
  get sizes(): ESBreadcrumbsDefaultOptionsSizes {
    return this._sizes;
  }
  set sizes(value: ESBreadcrumbsDefaultOptionsSizes) {
    this._sizes = value || this.defaultOptions?.sizes || ES_BREADCRUMBS_DEFAULT_SIZES;
  }

  /**
   * @ignore
   */
  @ContentChild(ESBreadcrumbsMoreDirective, { read: TemplateRef, static: false })
  public moreTemplate: any;

  /**
   * @ignore
   */
  @ContentChild(ESBreadcrumbsSeparatorDirective, { read: TemplateRef, static: false })
  public separatorTemplate: any;

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
      const sizes = this.sizes;

      const widths = this.breadcrumbs.map(({ data: { label, icon, breadcrumbs } }) => {
        let result = sizes.itemPadding;
        if (label) {
          result += this.getLabelWidth(label);
        }
        if (icon) {
          result += sizes.icon;
        }
        if (label && icon) {
          result += sizes.iconMargin;
        }
        if (breadcrumbs) {
          result += sizes.menu;
        }
        return result;
      });

      let scrollWidth =
        widths.reduce((acc, w) => acc + w, 0) + sizes.separator * (widths.length - 1);
      const clientWidth = element.clientWidth;

      const collapseIndexes = [];
      const collapseBreadcrumbs = [];

      for (let i = 1; i < widths.length - 1 && scrollWidth > clientWidth; i++) {
        if (!collapseIndexes.length) {
          scrollWidth += sizes.more + sizes.separator;
        }

        collapseIndexes.push(i);
        collapseBreadcrumbs.push(this.breadcrumbs[i]);
        scrollWidth -= widths[i] + sizes.separator;
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
  public breadcrumbs: ESBreadcrumb[] = [];

  /**
   * @internal
   * @ignore
   */
  public collapseIndexes: number[] = [];

  /**
   * @internal
   * @ignore
   */
  public collapseBreadcrumbs: ESBreadcrumb[] = [];

  private destroyed$ = new Subject();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breadcrumbsService: ESBreadcrumbsService,
    @Optional()
    @Inject(ES_BREADCRUMBS_DEFAULT_OPTIONS)
    private defaultOptions: ESBreadcrumbsDefaultOptions
  ) {
    this.typography = defaultOptions?.typography || ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY;
    this.sizes = defaultOptions?.sizes || ES_BREADCRUMBS_DEFAULT_SIZES;
  }

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

  /**
   * @internal
   * @ignore
   */
  ngAfterContentInit() {
    if ((document as any).fonts?.ready) {
      (document as any).fonts.ready.then(() => {
        this.onResize();

        // Tests in CI fail without this check.
        // tslint:disable-next-line
        if (!this.changeDetector['destroyed']) {
          this.changeDetector.detectChanges();
        }
      });
    }
  }

  private getLabelWidth(text: string) {
    const container = this.elementWidth.nativeElement;
    container.textContent = text;
    const width = container.clientWidth + 1;
    container.textContent = '';
    return width;
  }
}
