import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
  Optional,
  Self,
  ChangeDetectorRef,
  HostBinding,
  ViewChild,
  ElementRef
} from '@angular/core';

import { DatePipe } from '@angular/common';
import { ControlValueAccessor, NgControl, FormGroupDirective } from '@angular/forms';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';

import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
const autoCorrectedTimePipe = createAutoCorrectedDatePipe('HH:MM');
const autoCorrectedTimeSecondsPipe = createAutoCorrectedDatePipe('HH:MM:SS');

import { ESTimepickerLocale } from './timepicker.component.locale';

@Component({
  selector: 'es-timepicker',
  templateUrl: './timepicker.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: MatFormFieldControl, useExisting: ESTimepickerComponent }]
})
export class ESTimepickerComponent
  implements ControlValueAccessor, MatFormFieldControl<ESTimepickerComponent>, OnDestroy {
  /**
   * @internal
   * @ignore
   */
  public mask = {
    mask: [/\d/, /\d/, ':', /\d/, /\d/],
    pipe: autoCorrectedTimePipe
  };

  private _withSeconds = false;

  /**
   * Enable seconds input.
   */
  @Input()
  get withSeconds(): boolean {
    return this._withSeconds;
  }
  set withSeconds(withSeconds: boolean) {
    this._withSeconds = coerceBooleanProperty(withSeconds);

    if (this.withSeconds) {
      this.mask = {
        mask: [/\d/, /\d/, ':', /\d/, /\d/, ':', /\d/, /\d/],
        pipe: autoCorrectedTimeSecondsPipe
      };
    } else {
      this.mask = { mask: [/\d/, /\d/, ':', /\d/, /\d/], pipe: autoCorrectedTimePipe };
    }
  }

  private _required = false;

  /**
   * Mark input as required and forbid clearing existing value.
   */
  @Input()
  public get required(): boolean {
    return this._required;
  }
  public set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }

  private _disabled = false;

  /**
   * Disable input.
   */
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }

  /**
   * @internal
   * @ignore
   */
  public stateChanges = new Subject<void>();

  private previousValue = '';
  private _value = '';

  /**
   * @internal
   * @ignore
   */
  public get value() {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  private _focused = false;

  /**
   * @internal
   * @ignore
   */
  public get focused() {
    return this._focused;
  }
  public set focused(focused: boolean) {
    this._focused = focused;
    this.stateChanges.next();
  }

  /**
   * @internal
   * @ignore
   */
  public get empty(): boolean {
    return !this.value;
  }

  /**
   * @internal
   * @ignore
   */
  public get placeholder(): string {
    const { labelHH, labelMM, labelSS } = this.locale;
    return this.withSeconds ? `${labelHH}:${labelMM}:${labelSS}` : `${labelHH}:${labelMM}`;
  }

  /**
   * @internal
   * @ignore
   */
  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }

    return false;
  }

  private static nextId = 0;

  /**
   * @internal
   * @ignore
   */
  @HostBinding() public id = `es-timepicker-${ESTimepickerComponent.nextId++}`;

  /**
   * @internal
   * @ignore
   */
  @HostBinding('attr.aria-describedby') public describedBy = '';

  /**
   * @internal
   * @ignore
   */
  @HostBinding('class.floating') public get shouldLabelFloat() {
    return this.focused || !!this.value;
  }

  @ViewChild('input', { static: true }) private input: ElementRef<HTMLInputElement>;

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
    @Optional() @Self() public ngControl: NgControl,
    /**
     * @internal
     */
    @Optional() public ngForm: FormGroupDirective,
    private datePipe: DatePipe,
    private locale: ESTimepickerLocale
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    this.stateChanges.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }

  /**
   * @internal
   * @ignore
   */
  public ngOnDestroy() {
    this.stateChanges.complete();
  }

  /**
   * @internal
   * @ignore
   */
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * @internal
   * @ignore
   */
  public writeValue(value: any) {
    if (value !== undefined) {
      if (value) {
        this.value = this.datePipe.transform(value, this.withSeconds ? 'HH:mm:ss' : 'HH:mm');
      } else {
        this.value = '';
      }
      this.previousValue = this.value;
      this.stateChanges.next();
    }
  }

  /**
   * @internal
   * @ignore
   */
  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  /**
   * @internal
   * @ignore
   */
  public onChange = (_: any) => {};

  /**
   * @internal
   * @ignore
   */
  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  /**
   * @internal
   * @ignore
   */
  public onTouched = () => {};

  /**
   * @internal
   * @ignore
   */
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
  }

  /**
   * @internal
   * @ignore
   */
  public onFocus() {
    this.focused = true;
    this.stateChanges.next();
  }

  /**
   * @internal
   * @ignore
   */
  public onBlur() {
    this.onTouched();
    this.focused = false;

    if ((!this.required || this.value) && !this.value.includes('_')) {
      if (this.value) {
        const [hours, minutes, seconds] = this.value.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(this.withSeconds ? seconds || 0 : 0);
        this.onChange(date);
      } else {
        this.onChange(null);
      }
      this.previousValue = this.value;
    } else {
      this.value = this.previousValue;
    }

    this.stateChanges.next();
  }

  /**
   * @internal
   * @ignore
   */
  public onContainerClick() {
    if (!this.focused && !this.disabled && this.input) {
      this.input.nativeElement.focus();
      this.stateChanges.next();
    }
  }
}
