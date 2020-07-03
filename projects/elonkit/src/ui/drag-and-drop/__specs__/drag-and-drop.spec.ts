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
import { By } from '@angular/platform-browser';

import { ESDragAndDropModule } from '../drag-and-drop.module';

const TEXT_TITLE = 'CHOOSE FILES';
const TEXT_HINT = 'This is an example of a hint';
const TEXT_ERROR = 'This is an example of an error';

const filesFixture = [
  {
    name: 'name1',
    size: 123,
    content: null,
    type: 'image/jpg'
  },
  {
    name: 'name2',
    size: 456,
    content: null,
    type: 'image/jpg'
  },
  {
    name: 'name3',
    size: 789,
    content: null,
    type: 'image/jpg'
  }
];

@Component({
  template: `
    <form #f="ngForm" [formGroup]="form" (ngSubmit)="onSubmit(f.value)">
      <es-drag-and-drop
        title="${TEXT_TITLE}"
        description="description"
        maxSize="50"
        formControlName="docs"
        accept="image/jpg,image/jpeg,image/png"
        type="binary"
      >
        <mat-hint>${TEXT_HINT}</mat-hint>
        <mat-error>${TEXT_ERROR}</mat-error>
      </es-drag-and-drop>
      <button id="submit-btn" type="submit">Submit</button>
    </form>
  `
})
class DragAndDropWrapperComponent {
  public form = new FormGroup({
    docs: new FormControl([], Validators.required)
  });
  public onSubmit(form: any) {}
}

describe('Drag And Drop', () => {
  it('Should render component', async () => {
    const component = await render(DragAndDropWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDragAndDropModule,
        MatIconTestingModule
      ]
    });
    expect(component.getByText(TEXT_TITLE)).toBeInTheDocument();
  });

  it('Should show hint', async () => {
    const component = await render(DragAndDropWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDragAndDropModule,
        MatIconTestingModule
      ]
    });
    expect(component.getByText(TEXT_HINT)).toBeInTheDocument();
  });

  it('Should show error', async () => {
    const component = await render(DragAndDropWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDragAndDropModule,
        MatIconTestingModule
      ]
    });
    const submitButton = component.container.querySelector('#submit-btn');
    component.click(submitButton);
    expect(component.getByText(TEXT_ERROR)).toBeInTheDocument();
  });

  it('Should add class on dragover and remove on drop', async () => {
    const component = await render(DragAndDropWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDragAndDropModule,
        MatIconTestingModule
      ]
    });
    const dragAndDropEl = component.fixture.debugElement.query(By.css('.es-drag-and-drop'));

    dragAndDropEl.triggerEventHandler('dragover', {
      preventDefault: () => {},
      stopPropagation: () => {}
    });
    component.fixture.detectChanges();
    expect(component.container.querySelector('.es-drag-and-drop_dragover')).toBeInTheDocument();

    dragAndDropEl.triggerEventHandler('drop', {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: []
      }
    });
    component.fixture.detectChanges();
    expect(component.container.querySelector('.es-drag-and-drop_dragover')).toBeNull();
  });

  it('Should add files to FormControl on drop', async () => {
    const component = await render(DragAndDropWrapperComponent, {
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatFormFieldModule,
        ESDragAndDropModule,
        MatIconTestingModule
      ]
    });
    spyOn(window.FileReader.prototype, 'onload').and.callFake(() => {
      this.files = [...filesFixture];
      this.cdRef.detectChanges();
      this.propagateChange(this.files);
    });

    const dragAndDropEl = component.fixture.debugElement.query(By.css('.es-drag-and-drop'));

    dragAndDropEl.triggerEventHandler('drop', {
      preventDefault: () => {},
      stopPropagation: () => {},
      dataTransfer: {
        files: {
          0: filesFixture[0],
          1: filesFixture[1],
          2: filesFixture[2],
          length: 3,
          item(i: number) {
            return this[i];
          }
        }
      }
    });
    component.fixture.detectChanges();

    const componentInstance = component.fixture.componentInstance;
    spyOn(componentInstance, 'onSubmit');

    const submitButton = component.container.querySelector('#submit-btn');
    component.click(submitButton);

    expect(componentInstance.onSubmit).toHaveBeenCalledWith({ docs: [...filesFixture] });
  });
});
