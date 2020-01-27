import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  OnInit,
  Input,
  HostBinding,
  Optional,
  Self,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChild,
  ContentChild,
  TemplateRef,
  InjectionToken,
  Inject
} from '@angular/core';

import { ControlValueAccessor, NgControl, FormGroupDirective } from '@angular/forms';

import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';

import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { ChipsAutocompleteOptionDirective } from '../chips-autocomplete/chips-autocomplete.directive';
import { ChipDirective } from '../chips-autocomplete/chip.directive';

import { MatChipInputEvent } from '@angular/material/chips';

import { ENTER, COMMA, SEMICOLON } from '@angular/cdk/keycodes';

export const ES_CHIPS_DEFAULT_OPTIONS = new InjectionToken<EsAutocompleteDefaultOptions>(
  'ES_CHIPS_DEFAULT_OPTIONS'
);

export interface EsAutocompleteDefaultOptions {
  debounceTime?: number;
  freeInput?: boolean;
}

@Component({
  selector: 'es-chips-autocomplete',
  templateUrl: './chips-autocomplete.component.html',
  styleUrls: ['./chips-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: ChipsAutocompleteComponent }]
})
export class ChipsAutocompleteComponent<T>
  implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy, OnInit {
  public separatorKeysCodes = [ENTER, COMMA, SEMICOLON];
  private static nextId = 0;
  /**
   * @ignore
   */
  public text = '';
  /**
   * @ignore
   */
  public stateChanges = new Subject<void>();
  private text$ = new Subject<string>();

  /**
   * If true this chip list is selectable
   */
  @Input() public selectable: boolean;

  /**
   * If true this chip list is removable
   */
  @Input() public removable: boolean;

  /**
   * Array of options
   */
  @Input() public options: T[];

  /**
   * Color of chips
   */
  @Input() public color: string;

  /**
   * If true the user can choose only unique options
   */
  @Input() public unique: false;

  /**
   * If true the user have options with checkboxes
   */
  @Input() public withCheckbox: false;

  // tslint:disable-next-line variable-name
  private _debounceTime: number;

  // tslint:disable-next-line variable-name
  private _freeInput: boolean;

  // tslint:disable-next-line variable-name
  private _value: T[] = [];

  // tslint:disable-next-line variable-name
  private _focused = false;

  // tslint:disable-next-line variable-name
  private _required = false;

  // tslint:disable-next-line variable-name
  private _disabled = false;

  // tslint:disable-next-line variable-name
  private _placeholder = '';

  /**
   * Change value after a particular time span has passed
   */
  @Input()
  public get debounceTime(): number {
    return this._debounceTime;
  }
  public set debounceTime(value: number) {
    this._debounceTime =
      value ||
      (this.autocompleteDefaultOptions && this.autocompleteDefaultOptions.debounceTime) ||
      0;
  }

  /**
   * If true the user input is not bound to provided options
   */
  @Input()
  public get freeInput(): boolean {
    return this._freeInput;
  }
  public set freeInput(value: boolean) {
    this._freeInput =
      value !== undefined
        ? value
        : this.autocompleteDefaultOptions && this.autocompleteDefaultOptions.freeInput
        ? this.autocompleteDefaultOptions.freeInput
        : false;
  }

  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  public get focused() {
    return this._focused;
  }
  public set focused(focused: boolean) {
    this._focused = focused;
    this.stateChanges.next();
  }

  public get empty(): boolean {
    return !this.value;
  }

  /**
   * This property is used to indicate whether the input is required
   */
  @Input()
  public get required() {
    return this._required;
  }
  public set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  /**
   * This property tells the form field when it should be in the disabled state
   */
  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(dis: boolean) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

  /**
   * This property allows us to tell component what to use as a placeholder
   */
  @Input()
  public get placeholder(): string {
    return this._placeholder;
  }

  public set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  @Input() public isLoading = false;

  /**
   * Function that maps an option control value to its display value in the trigger
   */
  @Input() public displayWith = (option: T): string => {
    return '' + option;
  };

  /**
   * Function that have chosen value
   */
  @Input() public valueFn = (option: any): any => {
    return option;
  };

  /**
   * Function that have compared values
   */
  @Input() compareWith = (a: T, b: T) => a === b;

  /**
   * @ignore
   */
  isOptionVisible(option: T) {
    if (this.unique) {
      if (this.value) {
        return !this.value.some(e => this.compareWith(e, option));
      }
    } else {
      return true;
    }
  }

  /**
   * Event emitted when user change text in input
   */
  @Output() public changeText = new EventEmitter<string>();

  @ViewChild('inputChild', { read: MatAutocompleteTrigger, static: true })
  private inputChild: MatAutocompleteTrigger;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;

  /**
   * Template that allows add custom options
   */
  @ContentChild(ChipsAutocompleteOptionDirective, { read: TemplateRef, static: false })
  public optionTemplate: any;
  @ContentChild(ChipDirective, { read: TemplateRef, static: false })
  public chipTemplate: any;

  @HostBinding() public id = `es-autocomplete-${ChipsAutocompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') public describedBy = '';

  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }

    return false;
  }

  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !!this.text || (this.value && this.value.length > 0);
  }

  /**
   * @ignore
   */
  constructor(
    public changeDetector: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Optional()
    public ngForm: FormGroupDirective,
    @Optional()
    @Inject(ES_CHIPS_DEFAULT_OPTIONS)
    private autocompleteDefaultOptions: EsAutocompleteDefaultOptions
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
    this.debounceTime =
      autocompleteDefaultOptions && autocompleteDefaultOptions.debounceTime
        ? autocompleteDefaultOptions.debounceTime
        : 0;
    this.freeInput =
      autocompleteDefaultOptions && autocompleteDefaultOptions.freeInput
        ? autocompleteDefaultOptions.freeInput
        : false;

    this.stateChanges.subscribe(() => {
      this.changeDetector.detectChanges();
    });
  }

  /**
   * @ignore
   */
  public ngOnInit() {
    this.text$.pipe(debounce(() => timer(this.debounceTime))).subscribe(text => {
      this.changeText.emit(text);
    });
  }

  /**
   * @ignore
   */
  public ngOnDestroy() {
    this.stateChanges.complete();
    this.changeText.complete();
  }

  /**
   * @ignore
   */
  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  /**
   * @ignore
   */
  public onContainerClick(event: MouseEvent) {
    this.openPanel(event);
  }

  /**
   * @ignore
   */
  private openPanel(event: MouseEvent) {
    if (!this.focused && !this.disabled && this.inputChild) {
      event.stopPropagation();
      this.inputChild.openPanel();
      (this.inputChild as any)._element.nativeElement.focus();
      this.stateChanges.next();
    }
  }

  /**
   * @ignore
   */
  public writeValue(value: any) {
    if (!!value) {
      this.value = value;
      this.text = this.value;
      this.stateChanges.next();
    }
  }

  /**
   * @ignore
   */
  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  /**
   * @ignore
   */
  public onChange = (_: any) => {};

  /**
   * @ignore
   */
  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  /**
   * @ignore
   */
  public onTouched = () => {};

  /**
   * @ignore
   */
  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    this.text$.next(this.text);
    this.onChange(this.text);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onFocus() {
    this.focused = true;
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onBlur() {
    this.onTouched();
    this.focused = false;
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onSuggestionSelect(event: Event) {
    this.value = this.value.concat(event);
    this.onChange(this.value);
    this.stateChanges.next();
    (this.inputChild as any)._element.nativeElement.value = '';
  }

  /**
   * @ignore
   */
  public onRemove(index: number) {
    this.value.splice(index, 1);
    this.onChange(this.value);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public add(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;
    if (this.freeInput) {
      if ((value || '').trim()) {
        this.value = this.value.concat(value.trim());
        this.onChange(this.value);
        this.stateChanges.next();
      }
    } else {
      const opt = this.options.find(
        option => this.displayWith(option).toLowerCase() === value.toLowerCase()
      );
      if (opt && !this.value.find(e => this.displayWith(e).toLowerCase() === value.toLowerCase())) {
        this.value = this.value.concat(opt);
        this.onChange(this.value);
        this.stateChanges.next();
      }
    }
    if (input) {
      input.value = '';
    }
  }

  /**
   * @ignore
   */
  public onSelect(event: MouseEvent, option: T) {
    if (this.withCheckbox) {
      event.stopPropagation();

      if (this.value) {
        if (!this.value.find(e => this.compareWith(e, option))) {
          this.value = this.value.concat(option);
        } else {
          this.value.splice(this.value.indexOf(option), 1);
        }
        this.onChange(this.value);
        this.stateChanges.next();
      }
    }
  }

  /**
   * @ignore
   */
  public isOptionChecked(option: T): boolean {
    if (this.value) {
      return this.value.find(e => this.compareWith(e, option));
    }
    return false;
  }
}
