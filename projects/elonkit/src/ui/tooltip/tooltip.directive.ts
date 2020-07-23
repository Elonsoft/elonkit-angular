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
  Directive,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef,
  AfterViewInit,
  HostBinding,
  HostListener
} from '@angular/core';

import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { getInnerFocusableElement } from '@elonkit/cdk/a11y';

import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty, NumberInput } from '@angular/cdk/coercion';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos,
  ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';

import {
  TooltipPosition,
  TooltipTouchGestures,
  getMatTooltipInvalidPositionError,
  MAT_TOOLTIP_SCROLL_STRATEGY,
  MAT_TOOLTIP_DEFAULT_OPTIONS,
  MatTooltipDefaultOptions
} from '@angular/material/tooltip';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { ESTooltipComponent } from './tooltip.component';

/** CSS class that will be attached to the overlay panel. */
const TOOLTIP_PANEL_CLASS = 'es-tooltip-panel';

/** Options used to bind passive event listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });

/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;

@Directive({
  selector: '[esTooltip]',
  exportAs: 'esTooltip'
})
export class ESTooltipDirective implements OnDestroy, AfterViewInit {
  @HostBinding('class.es-tooltip-trigger') class = true;

  @HostListener('focusout', ['$event']) onFocusOut(event: FocusEvent) {
    if (this.tooltipInstance) {
      if (this.interactive) {
        const isNext =
          event.relatedTarget &&
          (event.target as HTMLElement).compareDocumentPosition(
            event.relatedTarget as HTMLElement
          ) === 4;

        const element = getInnerFocusableElement(this.tooltipInstance.elementRef.nativeElement);

        if (isNext && element) {
          (element as HTMLElement).focus();
        } else if (event.relatedTarget) {
          this.hide(0);
        }
      } else {
        this.hide(0);
      }
    }
  }

  private _position: TooltipPosition = 'below';

  /**
   * Allows the user to define the position of the tooltip relative to the parent element.
   */
  @Input('esTooltipPosition')
  get position(): TooltipPosition {
    return this._position;
  }
  set position(value: TooltipPosition) {
    if (value !== this._position) {
      this._position = value;

      if (this.overlayRef) {
        this.updatePosition();

        if (this.tooltipInstance) {
          this.tooltipInstance.show(0);
        }

        this.overlayRef.updatePosition();
      }
    }
  }

  private _disabled = false;

  /**
   * Disables the display of the tooltip.
   */
  @Input('esTooltipDisabled')
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);

    // If tooltip is disabled, hide immediately.
    if (this._disabled) {
      this.hide(0);
    } else {
      this.setupPointerEvents();
    }
  }

  /**
   * The default delay in ms before showing the tooltip after show is called.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('esTooltipShowDelay') showDelay: number = this.defaultOptions.showDelay;

  /**
   * The default delay in ms before hiding the tooltip after hide is called.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('esTooltipHideDelay') hideDelay: number = this.defaultOptions.hideDelay;

  /**
   * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
   * uses a long press gesture to show and hide, however it can conflict with the native browser
   * gestures. To work around the conflict, Angular Material disables native gestures on the
   * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
   * elements). The different values for this option configure the touch event handling as follows:
   * - auto - Enables touch gestures for all elements, but tries to avoid conflicts with native
   * browser gestures on particular elements. In particular, it allows text selection on inputs and
   * textareas, and preserves the native browser dragging on elements marked as draggable.
   * - on - Enables touch gestures for all elements and disables native browser gestures with no
   * exceptions.
   * - off - Disables touch gestures. Note that this will prevent the tooltip from showing on touch
   * devices.
   */
  // tslint:disable-next-line:no-input-rename
  @Input('esTooltipTouchGestures') touchGestures: TooltipTouchGestures = 'auto';

  private _arrow = false;

  /**
   * If true, adds an arrow to the tooltip.
   */
  @Input('esTooltipArrow')
  get arrow() {
    return this._arrow;
  }
  set arrow(value) {
    this._arrow = coerceBooleanProperty(value);
  }

  private _interactive = false;

  /**
   * Makes a tooltip interactive, i.e. will not close when the user hovers over the tooltip.
   */
  @Input('esTooltipInteractive')
  get interactive() {
    return this._interactive;
  }
  set interactive(value) {
    this._interactive = coerceBooleanProperty(value);
  }

  private _content: ElementRef<HTMLElement>;

  /**
   * Template to display instead of the message.
   */
  @Input('esTooltipContent')
  get content() {
    return this._content;
  }
  set content(value) {
    if (this.message) {
      this.ariaDescriber.removeDescription(this.elementRef.nativeElement, this._message);
    }

    this._content = value;

    if (!(this.message || this._content) && this.isTooltipVisible()) {
      this.hide(0);
    } else {
      this.setupPointerEvents();
      this.updateTooltipMessage();
      if (this.message) {
        this.ngZone.runOutsideAngular(() => {
          Promise.resolve().then(() => {
            this.ariaDescriber.describe(this.elementRef.nativeElement, this.message);
          });
        });
      }
    }
  }

  private _message = '';

  /**
   * The message to be displayed in the tooltip.
   */
  @Input('esTooltip')
  get message() {
    return this._message;
  }
  set message(value: string) {
    if (this._message) {
      this.ariaDescriber.removeDescription(this.elementRef.nativeElement, this._message);
    }

    // If the message is not a string (e.g. number), convert it to a string and trim it.
    this._message = value != null ? `${value}`.trim() : '';

    if (!(this._message || this.content) && this.isTooltipVisible()) {
      this.hide(0);
    } else {
      this.setupPointerEvents();
      this.updateTooltipMessage();
      this.ngZone.runOutsideAngular(() => {
        // The `AriaDescriber` has some functionality that avoids adding a description if it's the
        // same as the `aria-label` of an element, however we can't know whether the tooltip trigger
        // has a data-bound `aria-label` or when it'll be set for the first time. We can avoid the
        // issue by deferring the description by a tick so Angular has time to set the `aria-label`.
        Promise.resolve().then(() => {
          this.ariaDescriber.describe(this.elementRef.nativeElement, this.message);
        });
      });
    }
  }

  private _tooltipClass: string | string[] | Set<string> | { [key: string]: any };

  /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
  @Input('esTooltipClass')
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value: string | string[] | Set<string> | { [key: string]: any }) {
    this._tooltipClass = value;
    if (this.tooltipInstance) {
      this.setTooltipClass(this._tooltipClass);
    }
  }

  /**
   * @internal
   * @ignore
   */
  overlayRef: OverlayRef | null;

  /**
   * @internal
   * @ignore
   */
  tooltipInstance: ESTooltipComponent | null;

  private portal: ComponentPortal<ESTooltipComponent>;

  private scrollStrategy: () => ScrollStrategy;
  private viewInitialized = false;

  /**
   * Manually-bound passive event listeners.
   */
  private passiveListeners = new Map<string, EventListenerOrEventListenerObject>();

  /**
   * Timer started at the last `touchstart` event.
   */
  private touchstartTimeout: number;

  /**
   * Emits when the component is destroyed.
   */
  private readonly destroyed$ = new Subject<void>();

  /**
   * @internal
   * @ignore
   */
  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef<HTMLElement>,
    private scrollDispatcher: ScrollDispatcher,
    private viewContainerRef: ViewContainerRef,
    private ngZone: NgZone,
    private platform: Platform,
    private ariaDescriber: AriaDescriber,
    private focusMonitor: FocusMonitor,
    @Inject(MAT_TOOLTIP_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() private dir: Directionality,
    @Optional()
    @Inject(MAT_TOOLTIP_DEFAULT_OPTIONS)
    private defaultOptions: MatTooltipDefaultOptions
  ) {
    this.scrollStrategy = scrollStrategy;

    if (defaultOptions) {
      if (defaultOptions.position) {
        this.position = defaultOptions.position;
      }

      if (defaultOptions.touchGestures) {
        this.touchGestures = defaultOptions.touchGestures;
      }
    }

    ngZone.runOutsideAngular(() => {
      elementRef.nativeElement.addEventListener('keydown', this.onKeyDown);
    });
  }

  /**
   * @internal
   * @ignore
   */
  ngAfterViewInit() {
    // This needs to happen after view init so the initial values for all inputs have been set.
    this.viewInitialized = true;
    this.setupPointerEvents();

    this.focusMonitor
      .monitor(this.elementRef)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(origin => {
        // Note that the focus monitor runs outside the Angular zone.
        if (origin === 'keyboard') {
          this.ngZone.run(() => this.show());
        }
      });
  }

  /**
   * @internal
   * @ignore
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    const nativeElement = this.elementRef.nativeElement;

    clearTimeout(this.touchstartTimeout);

    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.tooltipInstance = null;
    }

    // Clean up the event listeners set in the constructor
    nativeElement.removeEventListener('keydown', this.onKeyDown);
    this.passiveListeners.forEach((listener, event) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this.passiveListeners.clear();

    this.destroyed$.next();
    this.destroyed$.complete();

    this.ariaDescriber.removeDescription(nativeElement, this.message);
    this.focusMonitor.stopMonitoring(nativeElement);
  }

  /**
   * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input.
   */
  show(delay: number = this.showDelay): void {
    if (
      this.disabled ||
      !(this.message || this.content) ||
      (this.isTooltipVisible() &&
        !this.tooltipInstance.showTimeoutId &&
        !this.tooltipInstance.hideTimeoutId)
    ) {
      return;
    }

    const overlayRef = this.createOverlay();
    this.detach();
    this.portal = this.portal || new ComponentPortal(ESTooltipComponent, this.viewContainerRef);
    this.tooltipInstance = overlayRef.attach(this.portal).instance;
    this.tooltipInstance
      .afterHidden()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.detach());
    this.setTooltipClass(this._tooltipClass);
    this.tooltipInstance.parentElementRef = this.elementRef;
    this.tooltipInstance.interactive = this.interactive;

    this.updateTooltipMessage();
    this.tooltipInstance.show(delay);
  }

  /**
   * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input.
   */
  hide(delay: number = this.hideDelay) {
    if (this.tooltipInstance) {
      this.tooltipInstance.hide(delay);
    }
  }

  /**
   * Shows/hides the tooltip.
   */
  toggle() {
    this.isTooltipVisible() ? this.hide() : this.show();
  }

  /**
   * Returns true if the tooltip is currently visible to the user.
   */
  isTooltipVisible() {
    return !!this.tooltipInstance && this.tooltipInstance.isVisible();
  }

  /**
   * Handles the keydown events on the host element.
   * Needs to be an arrow function so that we can use it in addEventListener.
   */
  private onKeyDown = (event: KeyboardEvent) => {
    // tslint:disable-next-line:deprecation
    if (this.isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
      event.preventDefault();
      event.stopPropagation();
      this.ngZone.run(() => this.hide(0));
    }
  };

  /**
   * Create the overlay config and position strategy.
   */
  private createOverlay(): OverlayRef {
    if (this.overlayRef) {
      return this.overlayRef;
    }

    const scrollableAncestors = this.scrollDispatcher.getAncestorScrollContainers(this.elementRef);

    // Create connected position strategy that listens for scroll events to reposition.
    const strategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withTransformOriginOn('.es-tooltip')
      .withFlexibleDimensions(false)
      .withViewportMargin(8)
      .withScrollableContainers(scrollableAncestors);

    strategy.positionChanges.pipe(takeUntil(this.destroyed$)).subscribe(change => {
      if (this.tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this.tooltipInstance.isVisible()) {
          // After position changes occur and the overlay is clipped by
          // a parent scrollable then close the tooltip.
          this.ngZone.run(() => this.hide(0));
        } else {
          this.updateTooltipArrowPosition(change);
        }
      }
    });

    this.overlayRef = this.overlay.create({
      direction: this.dir,
      positionStrategy: strategy,
      panelClass: TOOLTIP_PANEL_CLASS,
      scrollStrategy: this.scrollStrategy()
    });

    this.updatePosition();

    this.overlayRef
      .detachments()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => this.detach());

    return this.overlayRef;
  }

  /**
   * Detaches the currently-attached tooltip.
   */
  private detach() {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }

    this.tooltipInstance = null;
  }

  /**
   * Updates the position of the current tooltip.
   */
  private updatePosition() {
    const position = this.overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this.getOrigin();
    const overlay = this.getOverlayPosition();

    position.withPositions([
      { ...origin.main, ...overlay.main },
      { ...origin.fallback, ...overlay.fallback }
    ]);
  }

  /**
   * @internal
   * @ignore
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
   */
  getOrigin(): { main: OriginConnectionPosition; fallback: OriginConnectionPosition } {
    const isLtr = !this.dir || this.dir.value === 'ltr';
    const position = this.position;
    let originPosition: OriginConnectionPosition;

    if (position === 'above' || position === 'below') {
      originPosition = { originX: 'center', originY: position === 'above' ? 'top' : 'bottom' };
    } else if (
      position === 'before' ||
      (position === 'left' && isLtr) ||
      (position === 'right' && !isLtr)
    ) {
      originPosition = { originX: 'start', originY: 'center' };
    } else if (
      position === 'after' ||
      (position === 'right' && isLtr) ||
      (position === 'left' && !isLtr)
    ) {
      originPosition = { originX: 'end', originY: 'center' };
    } else {
      throw getMatTooltipInvalidPositionError(position);
    }

    const { x, y } = this.invertPosition(originPosition.originX, originPosition.originY);

    return {
      main: originPosition,
      fallback: { originX: x, originY: y }
    };
  }

  /**
   * @internal
   * @ignore
   * Returns the overlay position and a fallback position based on the user's preference.
   */
  getOverlayPosition(): { main: OverlayConnectionPosition; fallback: OverlayConnectionPosition } {
    const isLtr = !this.dir || this.dir.value === 'ltr';
    const position = this.position;
    let overlayPosition: OverlayConnectionPosition;

    if (position === 'above') {
      overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
    } else if (position === 'below') {
      overlayPosition = { overlayX: 'center', overlayY: 'top' };
    } else if (
      position === 'before' ||
      (position === 'left' && isLtr) ||
      (position === 'right' && !isLtr)
    ) {
      overlayPosition = { overlayX: 'end', overlayY: 'center' };
    } else if (
      position === 'after' ||
      (position === 'right' && isLtr) ||
      (position === 'left' && !isLtr)
    ) {
      overlayPosition = { overlayX: 'start', overlayY: 'center' };
    } else {
      throw getMatTooltipInvalidPositionError(position);
    }

    const { x, y } = this.invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);

    return {
      main: overlayPosition,
      fallback: { overlayX: x, overlayY: y }
    };
  }

  /**
   * Updates the tooltip message and repositions the overlay according to the new message length.
   */
  private updateTooltipMessage() {
    // Must wait for the message to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of the text.
    if (this.tooltipInstance) {
      this.tooltipInstance.message = this.message;
      this.tooltipInstance.content = this.content;
      this.tooltipInstance.markForCheck();

      this.ngZone.onMicrotaskEmpty
        .asObservable()
        .pipe(take(1), takeUntil(this.destroyed$))
        .subscribe(() => {
          if (this.tooltipInstance) {
            this.overlayRef.updatePosition();
          }
        });
    }
  }

  /**
   * Updates the arrow position.
   */
  private updateTooltipArrowPosition(change: ConnectedOverlayPositionChange) {
    if (this.arrow && this.tooltipInstance) {
      const rect = this.elementRef.nativeElement.getBoundingClientRect();
      const rectTooltip = this.tooltipInstance.elementRef.nativeElement.getBoundingClientRect();

      const diffX = rect.left - rectTooltip.left - 14;
      const diffY = rect.top - rectTooltip.top - 14;

      const offsetX = Math.ceil(diffX + this.elementRef.nativeElement.clientWidth / 2);
      const offsetY = Math.ceil(diffY + this.elementRef.nativeElement.clientHeight / 2);

      if (change.connectionPair.originX === 'end') {
        this.tooltipInstance.arrow = {
          position: 'left',
          offsetY
        };
      } else if (change.connectionPair.originX === 'start') {
        this.tooltipInstance.arrow = {
          position: 'right',
          offsetY
        };
      } else if (change.connectionPair.originY === 'top') {
        this.tooltipInstance.arrow = {
          position: 'bottom',
          offsetX
        };
      } else if (change.connectionPair.originY === 'bottom') {
        this.tooltipInstance.arrow = {
          position: 'top',
          offsetX
        };
      }

      this.tooltipInstance.markForCheck();
    }
  }

  /**
   * Updates the tooltip class.
   */
  private setTooltipClass(tooltipClass: string | string[] | Set<string> | { [key: string]: any }) {
    if (this.tooltipInstance) {
      this.tooltipInstance.tooltipClass = tooltipClass;
      this.tooltipInstance.markForCheck();
    }
  }

  /**
   * Inverts an overlay position.
   */
  private invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'above' || this.position === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }

  /**
   * Binds the pointer events to the tooltip trigger.
   */
  private setupPointerEvents() {
    // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
    if (
      this._disabled ||
      !(this.message || this.content) ||
      !this.viewInitialized ||
      this.passiveListeners.size
    ) {
      return;
    }

    // The mouse events shouldn't be bound on mobile devices, because they can prevent the
    // first tap from firing its click event or can cause the tooltip to open for clicks.
    if (!this.platform.IOS && !this.platform.ANDROID) {
      this.passiveListeners
        .set('mouseenter', () => this.show())
        .set('mouseleave', (event: MouseEvent) => {
          if (
            !this.interactive ||
            (this.tooltipInstance &&
              this.tooltipInstance.elementRef.nativeElement !== event.relatedTarget)
          ) {
            this.hide();
          }
        });
    } else if (this.touchGestures !== 'off') {
      this.disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        clearTimeout(this.touchstartTimeout);
        this.hide(this.defaultOptions.touchendHideDelay);
      };

      this.passiveListeners
        .set('touchend', touchendListener)
        .set('touchcancel', touchendListener)
        .set('touchstart', () => {
          // Note that it's important that we don't `preventDefault` here,
          // because it can prevent click events from firing on the element.
          clearTimeout(this.touchstartTimeout);
          this.touchstartTimeout = setTimeout(() => this.show(), LONGPRESS_DELAY);
        });
    }

    this.passiveListeners.forEach((listener, event) => {
      this.elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }

  /**
   * Disables the native browser gestures, based on how the tooltip has been configured.
   */
  private disableNativeGesturesIfNecessary() {
    const element = this.elementRef.nativeElement;
    const style = element.style;
    const gestures = this.touchGestures;

    if (gestures !== 'off') {
      // If gestures are set to `auto`, we don't disable text selection on inputs and
      // textareas, because it prevents the user from typing into them on iOS Safari.
      if (gestures === 'on' || (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA')) {
        style.userSelect = (style as any).msUserSelect = style.webkitUserSelect = (style as any).MozUserSelect =
          'none';
      }

      // If we have `auto` gestures and the element uses native HTML dragging,
      // we don't set `-webkit-user-drag` because it prevents the native behavior.
      if (gestures === 'on' || !element.draggable) {
        (style as any).webkitUserDrag = 'none';
      }

      style.touchAction = 'none';
      style.webkitTapHighlightColor = 'transparent';
    }
  }

  /**
   * @internal
   * @ignore
   */
  static ngAcceptInputType_disabled: BooleanInput;

  /**
   * @internal
   * @ignore
   */
  static ngAcceptInputType_hideDelay: NumberInput;

  /**
   * @internal
   * @ignore
   */
  static ngAcceptInputType_showDelay: NumberInput;

  /**
   * @internal
   * @ignore
   */
  static ngAcceptInputType_interactive: BooleanInput;

  /**
   * @internal
   * @ignore
   */
  static ngAcceptInputType_arrow: BooleanInput;
}
