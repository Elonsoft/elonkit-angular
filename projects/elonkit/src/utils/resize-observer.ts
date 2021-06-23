// tslint:disable: no-shadowed-variable

import { Observable } from 'rxjs';

export const resizeObserver = (target: HTMLElement) => {
  return new Observable<void>((observer) => {
    let width = target.clientWidth;

    // @ts-ignore
    const resizeObserver = new ResizeObserver((entries: any[]) => {
      entries.forEach((entry) => {
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
