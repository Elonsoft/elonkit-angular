import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESDropzoneLocale {
  public labelNotSupported = 'This file type is not supported';
  public labelOverUploadLimit = 'File size is over upload limit of';
  public labelKB = 'KB';
  public labelMB = 'MB';
}

@Injectable()
export class ESDropzoneLocaleRU extends ESDropzoneLocale {
  public labelNotSupported = 'Данный тип файла не поддерживается';
  public labelOverUploadLimit = 'Размер файла превышает лимит в';
  public labelKB = 'КБ';
  public labelMB = 'МБ';
}
