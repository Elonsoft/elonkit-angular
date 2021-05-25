/// <reference types="resize-observer-browser" />

import { Observable } from 'rxjs';

export const resizeObserver = (target: HTMLElement) => {
  return new Observable<void>((observer) => {
    let width = target.clientWidth;

    // tslint:disable-next-line: no-shadowed-variable
    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      entries.forEach((entry: ResizeObserverEntry) => {
        if (entry.contentRect) {
          if (width !== entry.contentRect.width) {
            width = entry.contentRect.width;
            observer.next();
          }
        }
      });
    });

    resizeObserver.observe(target);

    const unsubscribe = () => {
      resizeObserver.disconnect();
    };

    return unsubscribe;
  });
};
