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

import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MatFormFieldControl } from '@angular/material/form-field';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

import { AutocompleteOptionDirective } from '../autocomplete/autocomplete-option.directive';

export const ES_AUTOCOMPLETE_DEFAULT_OPTIONS = new InjectionToken<EsAutocompleteDefaultOptions>(
  'ES_AUTOCOMPLETE_DEFAULT_OPTIONS'
);

export interface EsAutocompleteDefaultOptions {
  debounceTime?: number;
  isCustomSelection?: boolean;
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
  public text = '';
  public stateChanges = new Subject<void>();
  private inputChild: MatAutocompleteTrigger;
  private text$ = new Subject<string>();

  @Input() public options: any[];
  @Input() public isLoading: boolean;
  @Input() public displayWith = (value?: any): string | undefined => {
    return value ? value : undefined;
  };
  @Input() public valueFn = (option: any): any => {
    return option;
  };

  @Output() changeText = new EventEmitter<string>();

  @ViewChild('inputChild', { read: MatAutocompleteTrigger, static: true })
  @ContentChild(AutocompleteOptionDirective, { read: TemplateRef, static: false })
  optionTemplate;

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
    this.isCustomSelection =
      autocompleteDefaultOptions && autocompleteDefaultOptions.isCustomSelection
        ? autocompleteDefaultOptions.isCustomSelection
        : false;
  }

  ngOnInit() {
    this.text$.pipe(debounceTime(this.debounceTime)).subscribe(text => {
      this.changeText.emit(text);
    });
  }

  public ngOnDestroy() {
    this.stateChanges.complete();
    this.changeText.complete();
  }

  // tslint:disable-next-line variable-name
  _debounceTime: number;

  @Input()
  get debounceTime(): number {
    return this._debounceTime;
  }
  set debounceTime(value: number) {
    this._debounceTime =
      value ||
      (this.autocompleteDefaultOptions && this.autocompleteDefaultOptions.debounceTime) ||
      0;
  }

  // tslint:disable-next-line variable-name
  _isCustomSelection: boolean;

  @Input()
  get isCustomSelection(): boolean {
    return this._isCustomSelection;
  }
  set isCustomSelection(value: boolean) {
    this._isCustomSelection =
      value !== undefined
        ? value
        : this.autocompleteDefaultOptions && this.autocompleteDefaultOptions.isCustomSelection
        ? this.autocompleteDefaultOptions.isCustomSelection
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

  static nextId = 0;
  @HostBinding() public id = `es-autocomplete-${AutocompleteComponent.nextId++}`;
  @HostBinding('attr.aria-describedby') public describedBy = '';
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !!this.text;
  }

  // tslint:disable-next-line variable-name
  private _required = false;

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

  @Input()
  public get placeholder() {
    return this._placeholder;
  }

  public set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  public get errorState() {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return control.invalid && (control.touched || (form && form.submitted));
    }

    return false;
  }

  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent) {
    this.openPanel();
  }

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

  public writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.text = this.value;
      this.stateChanges.next();
    }
  }

  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  onChange = (_: any) => {};

  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  onTouched = () => {};

  public onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
    this.text$.next(this.text);
    this.onChange(this.text);
    this.stateChanges.next();
  }

  onFocus() {
    this.focused = true;
    this.stateChanges.next();
  }

  onBlur() {
    this.onTouched();
    this.focused = false;

    if (!this.isCustomSelection) {
      this.text = this.value;
    }

    // this.changeText.emit(this.text);
    this.stateChanges.next();
  }

  public onSuggestionSelect(event: Event) {
    this.value = event;
    this.onChange(this.value);
    this.stateChanges.next();
  }
}
