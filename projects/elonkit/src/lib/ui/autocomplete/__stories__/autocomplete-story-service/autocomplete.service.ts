import { Injectable } from '@angular/core';

import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

@Injectable()
export class AutocompleteService {
  public getOptions(text?: string) {
    const options = GetFilterOptions(text, OPTIONS);
    return of({
      options
    }).pipe(delay(3000));
  }
}
