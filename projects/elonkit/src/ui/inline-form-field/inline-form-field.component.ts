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

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField } from '@angular/material/form-field';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

import { ESInlineFormFieldLocale } from './inline-form-field.component.locale';
import { NgControl } from '@angular/forms';

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
   * Event emitted when user clicks "edit" button.
   */
  @Output() edit = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Event emitted when user clicks "save" button.
   */
  @Output() save = new EventEmitter<ESInlineFormFieldComponent>();

  /**
   * Disable default behaviour of "save" button and only emit event.
   */
  @Input() manualSave = false;

  /**
   * Event emitted when user clicks "cancel" button.
   */
  @Output() cancel = new EventEmitter<ESInlineFormFieldComponent>();

  @ContentChild(MatFormField, { static: false }) private formField: MatFormField;
  @ContentChild(NgControl, { static: false }) private control: NgControl;

  /**
   * @ignore
   */
  public isHidden = true;

  /**
   * @ignore
   */
  constructor(
    public changeDetector: ChangeDetectorRef,
    public locale: ESInlineFormFieldLocale,
    @Optional()
    @Inject(ES_INLINE_FORM_FIELD_DEFAULT_OPTIONS)
    private defaultOptions: ESInlineFormFieldDefaultOptions
  ) {
    this.typography = (defaultOptions && defaultOptions.typography) || DEFAULT_TYPOGRAPHY;
  }

  /**
   * Use this method to manually switch between display value and input.
   */
  public setHidden(isHidden: boolean) {
    this.isHidden = isHidden;
    this.changeDetector.detectChanges();
  }

  /**
   * @ignore
   */
  public onEdit() {
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
   * @ignore
   */
  public onSave() {
    if (this.manualSave) {
      this.save.emit(this);
      return;
    }

    if (this.control && this.control.invalid) {
      return;
    }

    this.save.emit(this);
    this.isHidden = true;
  }

  /**
   * @ignore
   */
  public onCancel() {
    this.cancel.emit(this);
    this.isHidden = true;
  }
}
