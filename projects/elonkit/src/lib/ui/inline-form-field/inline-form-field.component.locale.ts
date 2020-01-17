import { Injectable } from '@angular/core';

@Injectable()
export class InlineFormFieldLocale {
  labelEdit: string;
  labelSave: string;
  labelCancel: string;
}

export class InlineFormFieldLocaleEN extends InlineFormFieldLocale {
  labelEdit = 'Edit';
  labelSave = 'Save';
  labelCancel = 'Cancel';
}

export class InlineFormFieldLocaleRU extends InlineFormFieldLocale {
  labelEdit = 'Редактировать';
  labelSave = 'Сохранить';
  labelCancel = 'Отмена';
}
