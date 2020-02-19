import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { render } from '@testing-library/angular';

import {
  ESInlineFormFieldModule,
  ESInlineFormFieldComponent,
  ESInlineFormFieldLocale,
  ESInlineFormFieldLocaleRU
} from '..';

const TEXT_HELLO = 'Hello';
const TEXT_HELLO_WORLD = 'Hello World';
const TEXT_ERROR_REQUIRED = 'Required';

const TIMEOUT = 100;

@Component({
  template: `
    <es-inline-form-field [text]="text" [manualSave]="manualSave" (save)="onSave($event)">
      <mat-form-field>
        <input [(ngModel)]="text" matInput placeholder="Input" />
      </mat-form-field>
    </es-inline-form-field>
  `
})
class InlineFormFieldWrapperComponent {
  @Input() manualSave = false;
  @Output() save = new EventEmitter<ESInlineFormFieldComponent>();

  text = TEXT_HELLO;

  onSave(event) {
    this.save.emit(event);
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <es-inline-form-field [text]="form.get('text').value">
        <mat-form-field>
          <input formControlName="text" matInput placeholder="Input" />
          <mat-error *ngIf="form.get('text').hasError('required')">
            ${TEXT_ERROR_REQUIRED}
          </mat-error>
        </mat-form-field>
      </es-inline-form-field>
    </form>
  `
})
class InlineFormFieldValidationWrapperComponent {
  form = new FormGroup({
    text: new FormControl(TEXT_HELLO, [Validators.required])
  });
}

@Component({
  template: `
    <form [formGroup]="form">
      <es-inline-form-field
        [text]="form.get('text').value"
        [manualSave]="true"
        (save)="onSave($event)"
      >
        <mat-form-field>
          <input formControlName="text" matInput placeholder="Input" />
          <mat-error *ngIf="form.get('text').hasError('required')">
            ${TEXT_ERROR_REQUIRED}
          </mat-error>
        </mat-form-field>
      </es-inline-form-field>
    </form>
  `
})
class InlineFormFieldServerValidationWrapperComponent {
  form = new FormGroup({
    text: new FormControl(TEXT_HELLO)
  });

  constructor(public changeDetector: ChangeDetectorRef) {}

  onSave(inlineFormField: ESInlineFormFieldComponent) {
    setTimeout(() => {
      if (this.form.get('text').value.length) {
        inlineFormField.setHidden(true);
      } else {
        this.form.get('text').setErrors({ required: true });
      }
      this.changeDetector.detectChanges();
    }, TIMEOUT);
  }
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

  it('Should reset text', async () => {
    const component = await render(InlineFormFieldWrapperComponent, {
      imports: [FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = component.getByLabelText('Edit');
    component.click(buttonEdit);

    const input = component.getByPlaceholderText('Input');
    component.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonCancel = component.getByLabelText('Cancel');
    component.click(buttonCancel);

    expect(component.fixture.componentInstance.text).toBe(TEXT_HELLO);
    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();
  });

  it('Should emit events', async () => {
    const onEdit = jest.fn();
    const onSave = jest.fn();
    const onCancel = jest.fn();

    const component = await render(ESInlineFormFieldComponent, {
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
    expect(onEdit).toBeCalledWith(component.fixture.componentInstance);

    expect(onSave).toBeCalledTimes(1);
    expect(onSave).toBeCalledWith(component.fixture.componentInstance);

    expect(onCancel).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith(component.fixture.componentInstance);
  });

  it('Should change locale', async () => {
    const component = await render(ESInlineFormFieldComponent, {
      imports: [ESInlineFormFieldModule],
      providers: [{ provide: ESInlineFormFieldLocale, useClass: ESInlineFormFieldLocaleRU }],
      excludeComponentDeclaration: true
    });

    const editButton = component.getByLabelText('Редактировать');
    expect(editButton).toBeInTheDocument();
    component.click(editButton);

    expect(component.getByLabelText('Сохранить')).toBeInTheDocument();
    expect(component.getByLabelText('Отменить')).toBeInTheDocument();
  });

  it('Should accept typography class', async () => {
    const component = await render(ESInlineFormFieldComponent, {
      imports: [ESInlineFormFieldModule],
      excludeComponentDeclaration: true
    });

    expect(component.getByTestId('root')).toHaveClass('mat-body-1');

    const typography = 'mat-body-2';

    component.fixture.componentInstance.typography = typography;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(component.getByTestId('root')).toHaveClass(typography);
  });

  it('Should disable default save behaviour', async () => {
    const onSave = jest.fn();

    const component = await render(InlineFormFieldWrapperComponent, {
      imports: [FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
      componentProperties: {
        manualSave: true,
        save: {
          emit: onSave
        } as any
      }
    });

    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = component.getByLabelText('Edit');
    component.click(buttonEdit);

    const input = component.getByPlaceholderText('Input');
    component.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonSave = component.getByLabelText('Save');
    component.click(buttonSave);

    expect(component.getByDisplayValue(TEXT_HELLO_WORLD)).toBeInTheDocument();
    expect(onSave).toBeCalled();
  });

  it('Should prevent save with validation errors', async () => {
    const component = await render(InlineFormFieldValidationWrapperComponent, {
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = component.getByLabelText('Edit');
    component.click(buttonEdit);

    const input = component.getByPlaceholderText('Input');
    component.input(input, { target: { value: '' } });

    const buttonSave = component.getByLabelText('Save');
    component.click(buttonSave);

    expect(component.getByText(TEXT_ERROR_REQUIRED)).toBeInTheDocument();

    component.input(input, { target: { value: TEXT_HELLO_WORLD } });
    component.click(buttonSave);

    expect(component.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();
    expect(component.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  });

  it('Should work with server-side validation', fakeAsync(async () => {
    const component = await render(InlineFormFieldServerValidationWrapperComponent, {
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(component.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = component.getByLabelText('Edit');
    component.click(buttonEdit);

    const input = component.getByPlaceholderText('Input');
    component.input(input, { target: { value: '' } });

    const buttonSave = component.getByLabelText('Save');
    component.click(buttonSave);

    expect(component.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();

    tick(TIMEOUT);

    expect(component.getByText(TEXT_ERROR_REQUIRED)).toBeInTheDocument();

    component.input(input, { target: { value: TEXT_HELLO_WORLD } });
    component.click(buttonSave);

    tick(TIMEOUT);

    expect(component.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();
    expect(component.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  }));
});
