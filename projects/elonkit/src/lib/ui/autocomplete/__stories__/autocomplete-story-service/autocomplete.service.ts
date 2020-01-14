import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

import { of } from 'rxjs';

const OPTIONS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

@Injectable()
export class AutocompleteService {
  public getOptions() {
    return of({
      OPTIONS
    }).pipe(delay(3000));
  }
}
