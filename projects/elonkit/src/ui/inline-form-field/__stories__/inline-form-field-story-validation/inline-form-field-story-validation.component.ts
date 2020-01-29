import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { of, throwError } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';

import { ESInlineFormFieldComponent } from '../..';

const save = (value: string) =>
  of(value).pipe(
    delay(100),
    switchMap(v => {
      if (v.length) {
        return of(v);
      }
      return throwError({ required: true });
    })
  );

@Component({
  selector: 'es-inline-form-field-validation',
  templateUrl: './inline-form-field-story-validation.component.html',
  styleUrls: ['./inline-form-field-story-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class InlineFormFieldStoryValidationComponent {
  form: FormGroup;
  previous: Array<{ control: FormControl; value: any }> = [];

  constructor(private changeDetector: ChangeDetectorRef, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      text: ['Hello World', [Validators.required]],
      server: 'Hello Server Side Validation'
    });
  }

  onEdit(control: FormControl) {
    const index = this.previous.findIndex(e => e.control === control);
    this.previous.splice(index, index === -1 ? 0 : 1);
    this.previous.push({ control, value: control.value });
  }

  onCancel(control: FormControl) {
    const previous = this.previous.find(e => e.control === control);
    control.setValue(previous.value);
  }

  onSave(inlineFormField: ESInlineFormFieldComponent) {
    const value: string = this.form.get('server').value;

    save(value).subscribe(
      () => {
        inlineFormField.setHidden(true);
      },
      errors => {
        this.form.get('server').setErrors(errors);
        this.changeDetector.detectChanges();
      }
    );
  }
}
