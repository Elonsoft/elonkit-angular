import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { render } from '@testing-library/angular';

import { ESInlineFormFieldModule } from './inline-form-field.module';
import { InlineFormFieldComponent } from './inline-form-field.component';
import {
  InlineFormFieldLocale,
  InlineFormFieldLocaleRU
} from './inline-form-field.component.locale';

const TEXT_HELLO = 'Hello';
const TEXT_HELLO_WORLD = 'Hello World';

@Component({
  template: `
    <es-inline-form-field [text]="text">
      <mat-form-field>
        <input [(ngModel)]="text" matInput placeholder="Input" />
      </mat-form-field>
    </es-inline-form-field>
  `
})
class InlineFormFieldWrapperComponent {
  text = TEXT_HELLO;
}

describe('InlineFormField', () => {
  it('Should update text', async () => {
    const component = await render(InlineFormFieldWrapperComponent, {
      imports: [FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = component.getByLabelText('Edit');
    component.click(buttonEdit);

    const input = component.getByPlaceholderText('Input');
    component.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonSave = component.getByLabelText('Save');
    component.click(buttonSave);

    expect(component.fixture.componentInstance.text).toBe(TEXT_HELLO_WORLD);
    expect(component.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  });

  it('Should emit events', async () => {
    const onEdit = jest.fn();
    const onSave = jest.fn();
    const onCancel = jest.fn();

    const component = await render(InlineFormFieldComponent, {
      componentProperties: {
        edit: {
          emit: onEdit
        } as any,
        save: {
          emit: onSave
        } as any,
        cancel: {
          emit: onCancel
        } as any
      },
      imports: [ESInlineFormFieldModule],
      excludeComponentDeclaration: true
    });

    component.click(component.getByLabelText('Edit'));
    component.click(component.getByLabelText('Save'));
    component.click(component.getByLabelText('Edit'));
    component.click(component.getByLabelText('Cancel'));

    expect(onEdit).toBeCalledTimes(2);
    expect(onSave).toBeCalledTimes(1);
    expect(onCancel).toBeCalledTimes(1);
  });

  it('Should change locale', async () => {
    const component = await render(InlineFormFieldComponent, {
      imports: [ESInlineFormFieldModule],
      providers: [{ provide: InlineFormFieldLocale, useClass: InlineFormFieldLocaleRU }],
      excludeComponentDeclaration: true
    });

    const editButton = component.getByLabelText('Редактировать');
    expect(editButton).toBeInTheDocument();
    component.click(editButton);

    expect(component.getByLabelText('Сохранить')).toBeInTheDocument();
    expect(component.getByLabelText('Отменить')).toBeInTheDocument();
  });

  it('Should accept typography class', async () => {
    const typography = 'mat-body-2';

    const component = await render(InlineFormFieldComponent, {
      componentProperties: {
        typography
      },
      imports: [ESInlineFormFieldModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByTestId('root')).toHaveClass(typography);
  });
});
