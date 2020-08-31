import { Injectable } from '@angular/core';

import { of } from 'rxjs';

const CATEGORIES = [
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
];

const ITEMS = [
  {
    id: 1,
    categoryId: 1,
    title: `Item #1-1`
  },
  {
    id: 2,
    categoryId: 1,
    title: `Item #1-2`
  },
  {
    id: 3,
    categoryId: 1,
    title: `Item #1-3`
  },
  {
    id: 4,
    categoryId: 2,
    title: `Item #2-1`
  },
  {
    id: 5,
    categoryId: 2,
    title: `Item #2-2`
  },
  {
    id: 6,
    categoryId: 2,
    title: `Item #2-3`
  },
  {
    id: 7,
    categoryId: 3,
    title: `Item #3-1`
  },
  {
    id: 8,
    categoryId: 3,
    title: `Item #3-2`
  },
  {
    id: 9,
    categoryId: 3,
    title: `Item #3-3`
  }
];

@Injectable()
export class CategoriesService {
  getAll() {
    return of(CATEGORIES);
  }

  getOne(id: number) {
    return of(CATEGORIES.find((item) => item.id === id));
  }
}

@Injectable()
export class ItemsService {
  getAll(categoryId: number) {
    return of(ITEMS.filter((item) => item.categoryId === categoryId));
  }

  getOne(id: number) {
    return of(ITEMS.find((item) => item.id === id));
  }
}
