import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { fireEvent, render, screen } from '@testing-library/angular';

import { ESInlineFormFieldComponent, ESInlineFormFieldModule } from '..';
import { ESLocaleService, ru } from '../../locale';

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
  @Input() public manualSave = false;
  @Output() public save = new EventEmitter<ESInlineFormFieldComponent>();

  public text = TEXT_HELLO;

  public onSave(event) {
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
  public form = new FormGroup({
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
  public form = new FormGroup({
    text: new FormControl(TEXT_HELLO)
  });

  constructor(public changeDetector: ChangeDetectorRef) {}

  public onSave(inlineFormField: ESInlineFormFieldComponent) {
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

    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = screen.getByLabelText('Edit');
    fireEvent.click(buttonEdit);

    const input = screen.getByPlaceholderText('Input');
    fireEvent.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonSave = screen.getByLabelText('Save');
    fireEvent.click(buttonSave);

    expect(component.fixture.componentInstance.text).toBe(TEXT_HELLO_WORLD);
    expect(screen.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  });

  it('Should reset text', async () => {
    const component = await render(InlineFormFieldWrapperComponent, {
      imports: [FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = screen.getByLabelText('Edit');
    fireEvent.click(buttonEdit);

    const input = screen.getByPlaceholderText('Input');
    fireEvent.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonCancel = screen.getByLabelText('Cancel');
    fireEvent.click(buttonCancel);

    expect(component.fixture.componentInstance.text).toBe(TEXT_HELLO);
    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();
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

    fireEvent.click(screen.getByLabelText('Edit'));
    fireEvent.click(screen.getByLabelText('Save'));
    fireEvent.click(screen.getByLabelText('Edit'));
    fireEvent.click(screen.getByLabelText('Cancel'));

    expect(onEdit).toBeCalledTimes(2);
    expect(onEdit).toBeCalledWith(component.fixture.componentInstance);

    expect(onSave).toBeCalledTimes(1);
    expect(onSave).toBeCalledWith(component.fixture.componentInstance);

    expect(onCancel).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith(component.fixture.componentInstance);
  });

  it('Should change locale', async () => {
    const localeService = new ESLocaleService();
    localeService.register('ru', ru);
    localeService.use('ru');

    await render(ESInlineFormFieldComponent, {
      imports: [ESInlineFormFieldModule],
      providers: [{ provide: ESLocaleService, useValue: localeService }],
      excludeComponentDeclaration: true
    });

    const editButton = screen.getByLabelText(ru.inlineFormField.labelEdit);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);

    expect(screen.getByLabelText(ru.inlineFormField.labelSave)).toBeInTheDocument();
    expect(screen.getByLabelText(ru.inlineFormField.labelCancel)).toBeInTheDocument();
  });

  it('Should accept typography class', async () => {
    const component = await render(ESInlineFormFieldComponent, {
      imports: [ESInlineFormFieldModule],
      excludeComponentDeclaration: true
    });

    expect(screen.getByTestId('root')).toHaveClass('es-body-200');

    const typography = 'es-body-100';

    component.fixture.componentInstance.typography = typography;
    component.fixture.componentInstance.changeDetector.detectChanges();

    expect(screen.getByTestId('root')).toHaveClass(typography);
  });

  it('Should disable default save behaviour', async () => {
    const onSave = jest.fn();

    await render(InlineFormFieldWrapperComponent, {
      imports: [FormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule],
      componentProperties: {
        manualSave: true,
        save: {
          emit: onSave
        } as any
      }
    });

    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = screen.getByLabelText('Edit');
    fireEvent.click(buttonEdit);

    const input = screen.getByPlaceholderText('Input');
    fireEvent.input(input, { target: { value: TEXT_HELLO_WORLD } });

    const buttonSave = screen.getByLabelText('Save');
    fireEvent.click(buttonSave);

    expect(screen.getByDisplayValue(TEXT_HELLO_WORLD)).toBeInTheDocument();
    expect(onSave).toBeCalled();
  });

  it('Should prevent save with validation errors', async () => {
    await render(InlineFormFieldValidationWrapperComponent, {
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = screen.getByLabelText('Edit');
    fireEvent.click(buttonEdit);

    const input = screen.getByPlaceholderText('Input');
    fireEvent.input(input, { target: { value: '' } });

    const buttonSave = screen.getByLabelText('Save');
    fireEvent.click(buttonSave);

    expect(screen.getByText(TEXT_ERROR_REQUIRED)).toBeInTheDocument();

    fireEvent.input(input, { target: { value: TEXT_HELLO_WORLD } });
    fireEvent.click(buttonSave);

    expect(screen.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();
    expect(screen.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  });

  it('Should work with server-side validation', fakeAsync(async () => {
    await render(InlineFormFieldServerValidationWrapperComponent, {
      imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, ESInlineFormFieldModule]
    });

    expect(screen.getByText(TEXT_HELLO)).toBeInTheDocument();

    const buttonEdit = screen.getByLabelText('Edit');
    fireEvent.click(buttonEdit);

    const input = screen.getByPlaceholderText('Input');
    fireEvent.input(input, { target: { value: '' } });

    const buttonSave = screen.getByLabelText('Save');
    fireEvent.click(buttonSave);

    expect(screen.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();

    tick(TIMEOUT);

    expect(screen.getByText(TEXT_ERROR_REQUIRED)).toBeInTheDocument();

    fireEvent.input(input, { target: { value: TEXT_HELLO_WORLD } });
    fireEvent.click(buttonSave);

    tick(TIMEOUT);

    expect(screen.queryByText(TEXT_ERROR_REQUIRED)).toBeNull();
    expect(screen.getByText(TEXT_HELLO_WORLD)).toBeInTheDocument();
  }));
});
