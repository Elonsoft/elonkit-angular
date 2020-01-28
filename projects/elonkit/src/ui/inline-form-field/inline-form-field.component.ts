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
  private _typography: string;

  /**
   * Class applied to text.
   */
  @Input()
  get typography() {
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
  @Output() edit = new EventEmitter<void>();

  /**
   * Event emitted when user clicks "save" button.
   */
  @Output() save = new EventEmitter<void>();

  /**
   * Event emitted when user clicks "cancel" button.
   */
  @Output() cancel = new EventEmitter<void>();

  @ContentChild(MatFormField, { static: false }) private formField: MatFormField;

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
   * @ignore
   */
  public isHidden = true;

  /**
   * @ignore
   */
  public onEdit() {
    this.edit.emit();
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
    this.save.emit();
    this.isHidden = true;
  }

  /**
   * @ignore
   */
  public onCancel() {
    this.cancel.emit();
    this.isHidden = true;
  }
}
