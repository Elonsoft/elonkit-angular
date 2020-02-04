import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable()
export class PostsService {
  getOne(id: number) {
    return of({
      title: `Post #${id}`
    });
  }
}
