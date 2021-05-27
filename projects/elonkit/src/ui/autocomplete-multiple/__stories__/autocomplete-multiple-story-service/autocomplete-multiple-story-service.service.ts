import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

const OPTIONS = [
  { id: 1, name: 'Estonia' },
  { id: 2, name: 'Iceland' },
  { id: 3, name: 'Norway' },
  { id: 4, name: 'Lithuania' },
  { id: 5, name: 'Sweden' },
  { id: 6, name: 'Austria' },
  { id: 7, name: 'Switzerland' },
  { id: 8, name: 'Albania' },
  { id: 9, name: 'Portugal' },
  { id: 10, name: 'Russia' },
  { id: 11, name: 'India' },
  { id: 12, name: 'Oman' }
];

@Injectable()
export class AutocompleteMultipleStoryService {
  public getOptions(text: string): Observable<any> {
    return of(OPTIONS).pipe(
      debounceTime(1000),
      map((options) => options.filter((option) => option.name.toLowerCase().includes(text)))
    );
  }
}
