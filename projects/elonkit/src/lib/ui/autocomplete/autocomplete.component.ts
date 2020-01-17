import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnDestroy,
  HostBinding,
  Optional,
  Self,
  Input,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
  ContentChild,
  TemplateRef,
  InjectionToken,
  Inject
} from '@angular/core';

import { NgControl, ControlValueAccessor, FormGroupDirective } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { Subject, timer } from 'rxjs';
import { debounce } from 'rxjs/operators';

import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { AutocompleteOptionDirective } from '../autocomplete/autocomplete-option.directive';

export const ES_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken<EsAutocompleteDefaultOptions>(
  'ES_AUTOCOMPLETE_DEFAULT_OPTIONS'
);

export interface EsAutocompleteDefaultOptions {
  debounceTime?: number;
  freeInput?: boolean;
}

@Component({
  selector: 'es-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: AutocompleteComponent }]
})
export class AutocompleteComponent
  implements MatFormFieldControl<string>, ControlValueAccessor, OnDestroy, OnInit {
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
   * Array of options
   */
  @Input() public options: any[];

  /**
   * @ignore
   */
  @Input() public isLoading = false;

  /**
   * Function that maps an option control value to its display value in the trigger
   */
  @Input() public displayWith = (value?: any): string | undefined => {
    return value ? value : undefined;
  };

  /**
   * Function that have chosen value
   */
  @Input() public valueFn = (option: any): any => {
    return option;
  };

  /**
   * Event emitted when user change text in input
   */
  @Output() public changeText = new EventEmitter<string>();

  @ViewChild('inputChild', { read: MatAutocompleteTrigger, static: true })
  private inputChild: MatAutocompleteTrigger;

  /**
   * Template that allows add custom options
   */
  @ContentChild(AutocompleteOptionDirective, { read: TemplateRef, static: false })
  public optionTemplate: any;

  /**
   * @ignore
   */
  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional()
    public ngForm: FormGroupDirective,
    @Optional()
    @Inject(ES_AUTOCOMPLETE_DEFAULT_OPTIONS)
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

  // tslint:disable-next-line variable-name
  private _debounceTime: number;

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

  // tslint:disable-next-line variable-name
  private _freeInput: boolean;

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

  // tslint:disable-next-line variable-name
  private _value = '';

  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  // tslint:disable-next-line variable-name
  private _focused = false;

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

  private static nextId = 0;
  @HostBinding() public id = `es-autocomplete-${AutocompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') public describedBy = '';
  @HostBinding('class.floating')
  public get shouldLabelFloat(): boolean {
    return this.focused || !!this.text;
  }

  // tslint:disable-next-line variable-name
  private _required = false;

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

  // tslint:disable-next-line variable-name
  private _disabled = false;

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

  // tslint:disable-next-line variable-name
  private _placeholder = '';

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

  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }

    return false;
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
    this.openPanel();
  }

  /**
   * @ignore
   */
  public openPanel() {
    setTimeout(() => {
      if (!this.focused && !this.disabled && this.inputChild) {
        this.focused = true;
        // NOTE: workaround to focus when clicked around input
        (this.inputChild as any)._element.nativeElement.focus();
      }
    }, 0);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public writeValue(value: any) {
    if (value !== undefined) {
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

    if (!this.freeInput) {
      this.text = this.value;
    }

    // this.changeText.emit(this.text);
    this.stateChanges.next();
  }

  /**
   * @ignore
   */
  public onSuggestionSelect(event: Event) {
    this.value = event;
    this.onChange(this.value);
    this.stateChanges.next();
  }
}
