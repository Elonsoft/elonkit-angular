import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESDropzoneLocale {
  labelNotSupported = 'This file type is not supported';
  labelOverUploadLimit = 'File size is over upload limit of';
  labelKB = 'KB';
  labelMB = 'MB';
}

@Injectable()
export class ESDropzoneLocaleRU extends ESDropzoneLocale {
  labelNotSupported = 'Данный тип файла не поддерживается';
  labelOverUploadLimit = 'Размер файла превышает лимит в';
  labelKB = 'КБ';
  labelMB = 'МБ';
}
