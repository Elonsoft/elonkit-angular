import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ESTooltipService {
  public closed$ = new Subject<void>();
}
