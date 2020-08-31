import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESFileListLocale {
  labelDownload = 'Download';
  labelRemove = 'Remove';
  labelKB = 'KB';
  labelMB = 'MB';
  labelAt = 'at';
}

@Injectable()
export class ESFileListLocaleRU extends ESFileListLocale {
  labelDownload = 'Скачать';
  labelRemove = 'Удалить';
  labelKB = 'КБ';
  labelMB = 'МБ';
  labelAt = 'в';
}
