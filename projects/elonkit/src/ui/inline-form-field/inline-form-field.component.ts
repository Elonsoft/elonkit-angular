import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  InjectionToken,
  Optional,
  Inject
} from '@angular/core';

import { FormControl, FormControlName, NgModel } from '@angular/forms';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

import { ESInlineFormFieldLocale } from './inline-form-field.component.locale';

export interface ESInlineFormFieldDefaultOptions {
  typography?: string;
}

const DEFAULT_TYPOGRAPHY = 'mat-body-1';

export const ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken<
  ESInlineFormFieldDefaultOptions
>('ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS');

@Component({
  selector: 'es-inline-form-field',
  templateUrl: './inline-form-field.component.html',
  styleUrls: ['./inline-form-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      }
    },
    {
      provide: MAT_LABEL_GLOBAL_OPTIONS,
      useValue: {
        float: 'never'
      }
    }
  ]
})
export class ESInlineFormFieldComponent {
  private _typography;

  /**
   * Class applied to text.
   */
  @Input()
  get typography(): string {
    return this._typography;
  }
  set typography(value: string) {
    this._typography =
      value || (this.defaultOptions && this.defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  /**
   * Text to display.
   */
  @Input() text: string;

  /**
   * Disable default behaviour of "save" button and only emit event.
   */
  @Input() manualSave = false;

  /**
   * Event emitted when user clicks "edit" button.
   */
  @Output() edit = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Event emitted when user clicks "save" button.
   */
  @Output() save = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Event emitted when user clicks "cancel" button.
   */
  @Output() cancel = new EventEmitter<ESInlineFormFieldComponent>();

  @ContentChild(MatFormField, { static: false }) private formField: MatFormField;

  @ContentChild(NgModel, { static: false }) private ngModel: NgModel;
  @ContentChild(FormControl, { static: false }) private formControl: FormControl;
  @ContentChild(FormControlName, { static: false }) private formControlName: FormControlName;

  /**
   * @internal
   * @ignore
   */
  public isHidden = true;

  private previousValue;

  /**
   * @internal
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    public changeDetector: ChangeDetectorRef,
    /**
     * @internal
     */
    public locale: ESInlineFormFieldLocale,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS)
    private defaultOptions: ESInlineFormFieldDefaultOptions
  ) {
    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  private getControl(): FormControl | null {
    if (this.formControl) {
      return this.formControl;
    }
    if (this.formControlName) {
      return this.formControlName.control;
    }
    if (this.ngModel) {
      return this.ngModel.control;
    }
    return null;
  }

  /**
   * Use this method to manually switch between display value and input.
   */
  public setHidden(isHidden: boolean) {
    this.isHidden = isHidden;
    this.changeDetector.detectChanges();
  }

  /**
   * @internal
   * @ignore
   */
  public onEdit() {
    const control = this.getControl();
    if (control) {
      this.previousValue = control.value;
    }

    this.edit.emit(this);
    this.isHidden = false;
    if (this.formField) {
      const element = this.formField._elementRef.nativeElement as HTMLElement;
      const input = element.querySelector('input') || element.querySelector('textarea');

      if (input) {
        setTimeout(() => {
          input.focus();
        });
      }
    }
  }

  /**
   * @internal
   * @ignore
   */
  public onSave() {
    if (this.manualSave) {
      this.save.emit(this);
      return;
    }

    const control = this.getControl();
    if (control && control.invalid) {
      return;
    }

    this.save.emit(this);
    this.isHidden = true;
  }

  /**
   * @internal
   * @ignore
   */
  public onCancel() {
    const control = this.getControl();
    if (control) {
      control.setValue(this.previousValue);
    }

    this.cancel.emit(this);
    this.isHidden = true;
  }
}
