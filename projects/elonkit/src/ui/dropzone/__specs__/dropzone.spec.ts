import { render } from '@testing-library/angular';
import { MatIconTestingModule } from '@angular/material/icon/testing';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ESDropzoneModule } from '../dropzone.module';

const TEXT_TITLE = 'CHOOSE FILES';
const TEXT_DESCRIPTION = 'This is an example of a description';
const TEXT_HINT = 'This is an example of a hint';
const TEXT_ERROR = 'This is an example of an error';
const TEXT_SUBMIT = 'Submit';

@Component({
  template: `
    <form #f="ngForm" [formGroup]="form" (ngSubmit)="onSubmit(f.value)">
      <es-dropzone
        chooseText="${TEXT_TITLE}"
        dragText="${TEXT_DESCRIPTION}"
        formControlName="docs"
        accept="image/jpg,image/jpeg,image/png"
      >
        <mat-hint>${TEXT_HINT}</mat-hint>
        <mat-error>${TEXT_ERROR}</mat-error>
      </es-dropzone>
      <button id="submit-btn" type="submit">${TEXT_SUBMIT}</button>
    </form>
  `
})
class DropzoneWrapperComponent {
  public form = new FormGroup({
    docs: new FormControl([], Validators.required)
  });
  public onSubmit(form: any) {}
}

describe('Drag And Drop', () => {
  it('Should render component', async () => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });
    expect(component.getByText(TEXT_TITLE)).toBeInTheDocument();
    expect(component.getByText(TEXT_DESCRIPTION)).toBeInTheDocument();
  });

  it('Should show hint', async () => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });
    expect(component.getByText(TEXT_HINT)).toBeInTheDocument();
  });

  it('Should show error', async () => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });
    const submitButton = component.getByText(TEXT_SUBMIT);
    component.click(submitButton);
    expect(component.getByText(TEXT_ERROR)).toBeInTheDocument();
  });

  it('Should add class on dragover and remove on drop', async () => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });

    component.dragOver(component.getByText(TEXT_TITLE));
    expect(component.getByTestId('root')).toHaveClass('es-dropzone_dragover');

    component.drop(component.getByText(TEXT_TITLE), {
      dataTransfer: {
        files: {}
      }
    });
    expect(component.getByTestId('root')).not.toHaveClass('es-dropzone_dragover');
  });

  it('Should add files to FormControl on drop', async done => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });

    const fileFixture = {
      name: 'filename.png',
      type: 'image/png'
    };
    const file = new File([''], fileFixture.name, { type: fileFixture.type });

    component.drop(component.getByText(TEXT_TITLE), {
      dataTransfer: {
        files: {
          0: file,
          length: 1,
          item(i: number) {
            return this[i];
          }
        }
      }
    });

    const componentInstance = component.fixture.componentInstance;
    componentInstance.form.valueChanges.subscribe(res => {
      expect(res).toEqual({
        docs: [
          {
            base64: 'data:image/png;base64,',
            content: file,
            name: fileFixture.name,
            size: 0,
            type: fileFixture.type
          }
        ]
      });
      done();
    });
  });

  it('Should add files to FormControl on change', async done => {
    const component = await render(DropzoneWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDropzoneModule,
        MatIconTestingModule
      ]
    });

    const fileFixture = {
      name: 'filename.png',
      type: 'image/png'
    };
    const file = new File([''], fileFixture.name, { type: fileFixture.type });

    component.change(component.getByTestId('input'), {
      target: {
        files: {
          0: file,
          length: 1,
          item(i: number) {
            return this[i];
          }
        }
      }
    });

    const componentInstance = component.fixture.componentInstance;
    componentInstance.form.valueChanges.subscribe(res => {
      expect(res).toEqual({
        docs: [
          {
            base64: 'data:image/png;base64,',
            content: file,
            name: fileFixture.name,
            size: 0,
            type: fileFixture.type
          }
        ]
      });
      done();
    });
  });
});
