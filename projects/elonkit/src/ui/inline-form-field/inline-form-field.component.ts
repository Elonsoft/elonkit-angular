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
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';

import { Observable } from 'rxjs';

import { ESLocaleService, ESLocale } from '../locale';

export interface ESInlineFormFieldDefaultOptions {
  typography?: string;
}

const DEFAULT_TYPOGRAPHY = 'es-body-200';

export const ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken<ESInlineFormFieldDefaultOptions>(
  'ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS'
);

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
      provide: MAT_LABEL_GLOBAL_OPTIONS, // tslint:disable-line deprecation
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
  public get typography(): string {
    return this._typography;
  }
  public set typography(value: string) {
    this._typography =
      value || (this.defaultOptions && this.defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  /**
   * Text to display.
   */
  @Input() public text: string;

  /**
   * Disable default behaviour of "save" button and only emit event.
   */
  @Input() public manualSave = false;

  /**
   * Event emitted when user clicks "edit" button.
   */
  @Output() public edit = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Event emitted when user clicks "save" button.
   */
  @Output() public save = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Event emitted when user clicks "cancel" button.
   */
  @Output() public cancel = new EventEmitter<ESInlineFormFieldComponent>();

  @ContentChild(MatFormField) private formField: MatFormField;

  @ContentChild(NgModel) private ngModel: NgModel;
  @ContentChild(FormControl) private formControl: FormControl;
  @ContentChild(FormControlName) private formControlName: FormControlName;

  /**
   * @internal
   * @ignore
   */
  public isHidden = true;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

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
    public localeService: ESLocaleService,
    /**
     * @internal
     */
    @Optional()
    @Inject(ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS)
    private defaultOptions: ESInlineFormFieldDefaultOptions
  ) {
    this.locale$ = this.localeService.locale();

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
