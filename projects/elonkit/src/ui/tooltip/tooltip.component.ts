/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 *
 * Copyright Elonsoft LTD All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  ViewEncapsulation,
  HostListener,
  ElementRef,
  HostBinding
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';
import { AnimationEvent } from '@angular/animations';

import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { FocusMonitor } from '@angular/cdk/a11y';
import { getNextFocusableElement } from '@elonkit/cdk/a11y';

import { matTooltipAnimations, TooltipVisibility } from '@angular/material/tooltip';

import { Subject } from 'rxjs';

import { ESTooltipDirective } from './tooltip.directive';
import { ESTooltipService } from './tooltip.service';

@Component({
  selector: 'es-tooltip-component',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [matTooltipAnimations.tooltipState]
})
export class ESTooltipComponent implements OnDestroy {
  @HostBinding('style.zoom') public get zoom() {
    return this.sanitizer.bypassSecurityTrustStyle(this.visibility === 'visible' ? '1' : null);
  }

  @HostBinding('style.pointer-events') public get pointerEvents() {
    return this.sanitizer.bypassSecurityTrustStyle(this.interactive ? 'auto' : null);
  }

  @HostListener('body:click', ['$event']) public onBodyClick(event: Event) {
    if (this.disableCloseClickListener) {
      return;
    }

    const isContainer =
      this.elementRef.nativeElement.contains(event.target as HTMLElement) ||
      this.parentElementRef.nativeElement.contains(event.target as HTMLElement);

    if ((true || this.closeOnInteraction) && !(this.interactive && isContainer)) {
      this.hide(0);
    }
  }

  @HostListener('document:keydown', ['$event']) public onKeyDown(event: KeyboardEvent) {
    // tslint:disable-next-line:deprecation
    if (event.keyCode === ESCAPE && !hasModifierKey(event)) {
      event.preventDefault();
      event.stopPropagation();

      this.hide(0);
      this.focusMonitor.focusVia(this.parentElementRef, 'program');
    }
  }

  @HostListener('mouseenter', ['$event']) public onMouseEnter() {
    this.parent.cancelPossiblyHide();
  }

  @HostListener('mouseleave', ['$event']) public onMouseLeave(event: MouseEvent) {
    if (this.disableCloseHoverListener) {
      return;
    }

    if (this.interactive && event.relatedTarget !== this.parentElementRef.nativeElement) {
      this.hide(0);
    }
  }

  @HostListener('focusout', ['$event']) public onFocusOut(event: FocusEvent) {
    if (this.disableCloseFocusListener) {
      return;
    }

    // Timeout for correct document.hasFocus detection
    setTimeout(() => {
      if (this.interactive) {
        if (
          document.hasFocus() &&
          !event.relatedTarget &&
          this.elementRef.nativeElement.contains(event.target as HTMLElement)
        ) {
          return;
        }

        const isPrev =
          event.relatedTarget &&
          (event.target as HTMLElement).compareDocumentPosition(
            event.relatedTarget as HTMLElement
          ) === 2;

        if (isPrev) {
          this.parentElementRef.nativeElement.focus();
        } else {
          this.hide(0);
          const element = getNextFocusableElement(this.parentElementRef.nativeElement);
          if (element) {
            element.focus();
          }
        }
      } else {
        this.hide(0);
      }
    });
  }

  /**
   * @internal
   * @ignore
   * Message to display in the tooltip.
   */
  public message?: string;

  /**
   * @internal
   * @ignore
   * Content to display in the tooltip.
   */
  public content?: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   * Wheter the tooltip interactive.
   */
  public interactive: boolean;

  /**
   * @internal
   * @ignore
   * The arrow postition.
   */
  public arrow: { position: string; offsetX?: number; offsetY?: number } | null = null;

  /**
   * @internal
   * @ignore
   * Do not respond to focus events.
   */
  public disableCloseFocusListener = false;

  /**
   * @internal
   * @ignore
   * Do not respond to hover events.
   */
  public disableCloseHoverListener = false;

  /**
   * @internal
   * @ignore
   * Do not respond to backdrop click events.
   */
  public disableCloseClickListener = false;

  /**
   * @internal
   * @ignore
   * Directive's host element class instance.
   */
  public parent: ESTooltipDirective;

  /**
   * @internal
   * @ignore
   * Directive's host element reference.
   */
  public parentElementRef: ElementRef<HTMLElement>;

  /**
   * @internal
   * @ignore
   * Classes to be added to the tooltip. Supports the same syntax as `ngClass`.
   */
  public tooltipClass: string | string[] | Set<string> | { [key: string]: any };

  /**
   * @internal
   * @ignore
   * The timeout ID of any current timer set to show the tooltip.
   */
  public showTimeoutId: number | null;

  /**
   * @internal
   * @ignore
   * The timeout ID of any current timer set to hide the tooltip.
   */
  public hideTimeoutId: number | null;

  /**
   * @internal
   * @ignore
   * Property watched by the animation framework to show or hide the tooltip.
   */
  public visibility: TooltipVisibility = 'initial';

  /**
   * Whether interactions on the page should close the tooltip
   */
  private closeOnInteraction = false;

  /**
   * Subject for notifying that the tooltip has been hidden from the view.
   */
  private readonly onHide$ = new Subject<void>();

  /**
   * @internal
   * @ignore
   */
  constructor(
    private changeDetector: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private focusMonitor: FocusMonitor,
    private tooltipService: ESTooltipService,
    /**
     * @internal
     */
    public elementRef: ElementRef<HTMLElement>
  ) {}

  /**
   * @internal
   * @ignore
   */
  public ngOnDestroy() {
    this.onHide$.complete();
  }

  /**
   * Shows the tooltip with an animation originating from the provided origin.
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  public show(delay: number) {
    // Cancel the delayed hide if it is scheduled
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }

    // Body interactions should cancel the tooltip if there is a delay in showing.
    this.closeOnInteraction = true;
    this.showTimeoutId = setTimeout(() => {
      this.visibility = 'visible';
      this.showTimeoutId = null;

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this.markForCheck();
    }, delay);
  }

  /**
   * Begins the animation to hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the tooltip.
   */
  public hide = (delay: number = 0) => {
    // Cancel the delayed show if it is scheduled
    if (this.showTimeoutId) {
      clearTimeout(this.showTimeoutId);
      this.showTimeoutId = null;
    }

    this.hideTimeoutId = setTimeout(() => {
      this.visibility = 'hidden';
      this.hideTimeoutId = null;

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this.markForCheck();
    }, delay);
  };

  /**
   * Returns an observable that notifies when the tooltip has been hidden from view.
   */
  public afterHidden() {
    return this.onHide$.asObservable();
  }

  /**
   * Whether the tooltip is being displayed.
   */
  public isVisible() {
    return this.visibility === 'visible';
  }

  /**
   * @internal
   * @ignore
   */
  public animationStart() {
    this.closeOnInteraction = false;
  }

  /**
   * @internal
   * @ignore
   */
  public animationDone(event: AnimationEvent) {
    const toState = event.toState as TooltipVisibility;

    if (toState === 'hidden' && !this.isVisible()) {
      this.onHide$.next();
      this.tooltipService.closed$.next();
    }

    if (toState === 'visible' || toState === 'hidden') {
      this.closeOnInteraction = true;
    }
  }

  /**
   * @internal
   * @ignore
   * Marks that the tooltip needs to be checked in the next change detection run.
   * Mainly used for rendering the initial text before positioning a tooltip, which
   * can be problematic in components with OnPush change detection.
   */
  public markForCheck() {
    this.changeDetector.markForCheck();
  }
}
