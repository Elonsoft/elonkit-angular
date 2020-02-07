import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ESInlineFormFieldLocale {
  labelEdit = 'Edit';
  labelSave = 'Save';
  labelCancel = 'Cancel';
}

@Injectable()
export class ESInlineFormFieldLocaleRU extends ESInlineFormFieldLocale {
  labelEdit = 'Редактировать';
  labelSave = 'Сохранить';
  labelCancel = 'Отменить';
}
