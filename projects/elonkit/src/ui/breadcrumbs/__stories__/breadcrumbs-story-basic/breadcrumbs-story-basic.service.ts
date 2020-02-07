import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable()
export class CategoriesService {
  getAll() {
    return of([
      {
        id: 1,
        title: `Category #1`
      },
      {
        id: 2,
        title: `Category #2`
      },
      {
        id: 3,
        title: `Category #3`
      }
    ]);
  }
  getOne(id: number) {
    return of({
      title: `Category #${id}`
    });
  }
}

@Injectable()
export class ItemsService {
  getOne(id: number) {
    return of({
      title: `Item #${id}`
    });
  }
}
