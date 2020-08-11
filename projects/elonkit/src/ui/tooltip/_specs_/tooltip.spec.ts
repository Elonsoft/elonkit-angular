import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { fakeAsync, tick, flush, inject } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';

import { render, getByText, queryByText, RenderResult } from '@testing-library/angular';

import { ESTooltipModule } from '..';

const BUTTON_TEXT = 'Button';
const BUTTON_ACTION_TEXT = 'Action';
const BUTTON_CLOSE_TEXT = 'Close';
const TOOLTIP_TEXT = 'Message';

@Component({
  template: `
    <button
      esTooltip
      [esTooltipContent]="content"
      [esTooltipArrow]="esTooltipArrow"
      [esTooltipDisableFocusListener]="esTooltipDisableFocusListener"
      [esTooltipDisableHoverListener]="esTooltipDisableHoverListener"
      [esTooltipDisableCloseFocusListener]="esTooltipDisableCloseFocusListener"
      [esTooltipDisableCloseHoverListener]="esTooltipDisableCloseHoverListener"
      [esTooltipDisableCloseClickListener]="esTooltipDisableCloseClickListener"
    >
      ${BUTTON_TEXT}
    </button>
    <ng-template #content let-hide="hide">
      ${TOOLTIP_TEXT}
      <button>${BUTTON_ACTION_TEXT}</button>
      <button (click)="hide()">${BUTTON_CLOSE_TEXT}</button>
    </ng-template>
  `
})
class TooltipWrapperComponent {
  @Input() esTooltipArrow: boolean;
  @Input() esTooltipDisableFocusListener: boolean;
  @Input() esTooltipDisableHoverListener: boolean;
  @Input() esTooltipDisableCloseFocusListener: boolean;
  @Input() esTooltipDisableCloseHoverListener: boolean;
  @Input() esTooltipDisableCloseClickListener: boolean;

  constructor(public changeDetector: ChangeDetectorRef) {}
}

describe('Tooltip', () => {
  let overlay: OverlayContainer;
  let overlayElement: HTMLElement;
  let component: RenderResult<TooltipWrapperComponent, TooltipWrapperComponent>;

  beforeEach(async () => {
    component = await render(TooltipWrapperComponent, {
      imports: [ESTooltipModule],
      componentProperties: {
        esTooltipArrow: true
      }
    });

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlay = oc;
      overlayElement = oc.getContainerElement();
    })();
  });

  afterEach(inject([OverlayContainer], (currentOverlay: OverlayContainer) => {
    currentOverlay.ngOnDestroy();
    overlay.ngOnDestroy();
  }));

  it('Should display a template', async () => {
    component.mouseEnter(component.getByText(BUTTON_TEXT));
    expect(queryByText(overlayElement, TOOLTIP_TEXT)).toBeInTheDocument();
  });

  it('Should render an arrow', async () => {
    component.fixture.componentInstance.esTooltipArrow = true;

    component.mouseEnter(component.getByText(BUTTON_TEXT));
    expect(overlayElement.querySelector('.es-tooltip__arrow')).toBeInTheDocument();
  });

  it('Should close tooltip by a close button click', fakeAsync(async () => {
    component.mouseEnter(component.getByText(BUTTON_TEXT));
    expect(queryByText(overlayElement, TOOLTIP_TEXT)).toBeInTheDocument();

    component.click(getByText(overlayElement, BUTTON_CLOSE_TEXT));

    // Through trial and error...
    tick();
    component.fixture.componentInstance.changeDetector.detectChanges();
    tick();
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(queryByText(overlayElement, TOOLTIP_TEXT)).not.toBeInTheDocument();
  }));
});
