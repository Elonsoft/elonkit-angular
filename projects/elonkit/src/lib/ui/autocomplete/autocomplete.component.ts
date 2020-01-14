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
  ViewChild
} from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { NgControl, ControlValueAccessor, FormGroupDirective } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { debounceTime } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

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
  public get value(): any {
    return this._value;
  }

  public set value(value: any) {
    this._value = value;
    this.stateChanges.next();
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional()
    public ngForm: FormGroupDirective
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
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
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !!this.text;
  }

  @Input()
  public get required() {
    return this._required;
  }
  public set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @Input()
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(dis: boolean) {
    this._disabled = coerceBooleanProperty(dis);
    this.stateChanges.next();
  }

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
  static nextId = 0;

  @ViewChild('inputChild', { read: MatAutocompleteTrigger, static: true })
  private inputChild: MatAutocompleteTrigger;

  @Output() changeText = new EventEmitter<string>();

  @Input() public options: string[];
  @Input() public debounceTime: number;

  @HostBinding() public id = `es-autocomplete-${AutocompleteComponent.nextId++}`;

  @HostBinding('attr.aria-describedby') public describedBy = '';
  public text = '';
  private text$ = new Subject<string>();
  // tslint:disable-next-line variable-name
  private _disabled = false;
  // tslint:disable-next-line variable-name
  private _required = false;
  // tslint:disable-next-line variable-name
  private _focused = false;
  // tslint:disable-next-line variable-name
  private _placeholder = '';

  // tslint:disable-next-line variable-name
  private _value = '';

  public stateChanges = new Subject<void>();

  ngOnInit() {
    this.text$.pipe(debounceTime(this.debounceTime)).subscribe(text => {
      this.changeText.emit(text);
    });
  }

  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick(event: MouseEvent) {
    this.openPanel();
  }

  public openPanel() {
    setTimeout(() => {
      if (!this.focused && !this.disabled) {
        this.focused = true;
        // NOTE: workaround to focus when clicked around input
        (this.inputChild as any)._element.nativeElement.focus();
      }
    }, 0);
    this.stateChanges.next();
  }

  public ngOnDestroy() {
    this.stateChanges.complete();
    this.changeText.complete();
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
    this.text = this.value;
    this.onTouched();
    this.focused = false;
    this.stateChanges.next();
  }

  public displayWith(suggestion?: any): string | undefined {
    return suggestion ? suggestion : undefined;
  }

  public onSuggestionSelect(event: Event) {
    this.value = event;
    this.onChange(this.value);
    this.stateChanges.next();
  }
}
