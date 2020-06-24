import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESFileListLocale {
  labelKB = 'KB';
  labelMB = 'MB';
}

@Injectable()
export class ESFileListLocaleRU extends ESFileListLocale {
  labelKB = 'КБ';
  labelMB = 'МБ';
}
