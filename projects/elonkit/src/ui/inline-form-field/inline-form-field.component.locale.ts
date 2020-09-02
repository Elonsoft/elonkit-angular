import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESInlineFormFieldLocale {
  public labelEdit = 'Edit';
  public labelSave = 'Save';
  public labelCancel = 'Cancel';
}

@Injectable()
export class ESInlineFormFieldLocaleRU extends ESInlineFormFieldLocale {
  public labelEdit = 'Редактировать';
  public labelSave = 'Сохранить';
  public labelCancel = 'Отменить';
}
