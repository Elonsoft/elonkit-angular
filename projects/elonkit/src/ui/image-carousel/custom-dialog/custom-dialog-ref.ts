import { OverlayRef } from '@angular/cdk/overlay';
import { BehaviorSubject } from 'rxjs';

export class CustomDialogRef {
  private afterClosed$ = new BehaviorSubject(null);

  constructor(private overlay: OverlayRef) {}

  public close(data?: any): void {
    this.overlay.dispose();
    this.afterClosed$.next(data);
  }

  public afterClosed() {
    return this.afterClosed$.asObservable();
  }
}
