import { Injectable, Injector, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType } from '@angular/cdk/portal';

import { CustomDialogRef } from './custom-dialog-ref';
import { CUSTOM_DIALOG_DATA } from './custom-dialog.tokens';

interface CustomDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
  data?: any;
}

const DEFAULT_CONFIG: CustomDialogConfig = {
  hasBackdrop: true
};

@Injectable()
export class CustomDialogService {
  constructor(private injector: Injector, private overlay: Overlay) {}

  public open(component: ComponentType<any>, config: CustomDialogConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new CustomDialogRef(overlayRef);
    const overlayComponent = this.attachDialogContainer(
      component,
      overlayRef,
      dialogConfig,
      dialogRef
    );

    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: CustomDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private attachDialogContainer(
    component: ComponentType<any>,
    overlayRef: OverlayRef,
    config: CustomDialogConfig,
    dialogRef: CustomDialogRef
  ) {
    const injector = this.createInjector(config, dialogRef);

    const containerPortal = new ComponentPortal(component, null, injector);
    const containerRef: ComponentRef<any> = overlayRef.attach(containerPortal);

    return containerRef.instance;
  }

  private createInjector(config: CustomDialogConfig, dialogRef: CustomDialogRef): PortalInjector {
    const injectionTokens = new WeakMap();

    injectionTokens.set(CustomDialogRef, dialogRef);
    injectionTokens.set(CUSTOM_DIALOG_DATA, config.data);

    return new PortalInjector(this.injector, injectionTokens);
  }

  private getOverlayConfig(config: CustomDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
