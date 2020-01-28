import { Injectable } from '@angular/core';

@Injectable()
export class ESInlineFormFieldLocale {
  labelEdit: string;
  labelSave: string;
  labelCancel: string;
}

export class ESInlineFormFieldLocaleEN extends ESInlineFormFieldLocale {
  labelEdit = 'Edit';
  labelSave = 'Save';
  labelCancel = 'Cancel';
}

export class ESInlineFormFieldLocaleRU extends ESInlineFormFieldLocale {
  labelEdit = 'Редактировать';
  labelSave = 'Сохранить';
  labelCancel = 'Отменить';
}
