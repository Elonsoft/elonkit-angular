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

import { Subject, Observable } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

import { ESBreadcrumb } from './breadcrumbs.types';
import { ESBreadcrumbsService } from './breadcrumbs.service';

import { ESBreadcrumbsMoreDirective } from './directives/breadcrumbs-more.directive';
import { ESBreadcrumbsSeparatorDirective } from './directives/breadcrumbs-separator.directive';
import { ESBreadcrumbsBackDirective } from './directives/breadcrumbs-back.directive';
import { ESLocaleService, ESLocale } from '../locale';

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

export const ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY = 'es-caption';

export const ES_BREADCRUMBS_DEFAULT_SIZES = {
  itemPadding: 4,
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
   * @internal
   * @ignore
   */
  public windowHistoryLength: number;

  /**
   * Whether to show Back button.
   */
  @Input() public withBackButton: ESBreadcrumb;

  /**
   * Class applied to breadcrumb labels.
   */
  @Input()
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography =
      value || this.defaultOptions?.typography || ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY;
  }

  private _sizes;

  /**
   * Sizes of component elements which are used for collapse calculations.
   */
  @Input()
  public get sizes(): ESBreadcrumbsDefaultOptionsSizes {
    return this._sizes;
  }
  public set sizes(value: ESBreadcrumbsDefaultOptionsSizes) {
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
  @ContentChild(ESBreadcrumbsBackDirective, { read: TemplateRef, static: false })
  public backTemplate: any;

  /**
   * @ignore
   */
  @ContentChild(ESBreadcrumbsSeparatorDirective, { read: TemplateRef, static: false })
  public separatorTemplate: any;

  /**
   * @internal
   * @ignore
   */
  @ViewChild('navigation', { static: true }) public elementNavigation: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  @ViewChild('width', { static: true }) public elementWidth: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  @ViewChild('backButton', { static: true }) public elementBackButton: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   */
  @HostListener('window:resize') public onResize() {
    const element = this.elementNavigation.nativeElement;
    const goBackButton = this.elementBackButton.nativeElement;

    if (element && this.breadcrumbs.length > 2) {
      const sizes = this.sizes;
      const widths = this.breadcrumbs.map(({ data: { label, icon, breadcrumbs } }) => {
        let result = 0;

        if (label) {
          result += sizes.itemPadding;
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
      const clientWidth = element.clientWidth - goBackButton.clientWidth;

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

  private destroyed$ = new Subject<void>();

  constructor(
    private changeDetector: ChangeDetectorRef,
    private breadcrumbsService: ESBreadcrumbsService,
    @Optional()
    @Inject(ES_BREADCRUMBS_DEFAULT_OPTIONS)
    private defaultOptions: ESBreadcrumbsDefaultOptions,

    private localeService: ESLocaleService
  ) {
    this.typography = defaultOptions?.typography || ES_BREADCRUMBS_DEFAULT_TYPOGRAPHY;
    this.sizes = defaultOptions?.sizes || ES_BREADCRUMBS_DEFAULT_SIZES;
    this.locale$ = this.localeService.locale();
  }

  /**
   * @ignore
   */
  public ngOnInit() {
    this.breadcrumbsService.breadcrumbs$
      .pipe(takeUntil(this.destroyed$), delay(1))
      .subscribe((breadcrumbs) => {
        this.breadcrumbs = breadcrumbs;
        this.onResize();
        this.changeDetector.detectChanges();
      });

    this.locale$.pipe(takeUntil(this.destroyed$)).subscribe((value) => {
      this.onResize();
    });
    this.windowHistoryLength = window.history.length;
  }

  /**
   * @ignore
   */
  public ngOnDestroy() {
    this.destroyed$.next();
  }

  /**
   * @ignore
   */
  public ngAfterContentInit() {
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

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  private getLabelWidth(text: string) {
    const container = this.elementWidth.nativeElement;
    container.textContent = text;
    const width = container.clientWidth + 1;
    container.textContent = '';
    return width;
  }

  /**
   * @internal
   * @ignore
   */
  public onClick() {
    if (window.history.length) {
      window.history.back();
    }
  }
}
