import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  HostBinding,
  Optional,
  Self,
  Host,
  ElementRef
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NgControl } from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

import { MatButton } from '@angular/material/button';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';

import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { debounceTime, switchMap, catchError, shareReplay, takeUntil } from 'rxjs/operators';

import { ESLocale, ESLocaleService } from '../locale';

import { ES_AUTOCOMPLETE_ANIMATIONS } from './autocomplete-multiple.animations';

@Component({
  selector: 'es-autocomplete-multiple',
  templateUrl: './autocomplete-multiple.component.html',
  styleUrls: ['./autocomplete-multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MatFormFieldControl, useExisting: ESAutocompleteMultipleComponent }],
  animations: ES_AUTOCOMPLETE_ANIMATIONS
})
export class ESAutocompleteMultipleComponent
  implements MatFormFieldControl<any[]>, ControlValueAccessor, OnInit, OnDestroy {
  private static nextId = 0;
  @HostBinding() public id = `es-autocomplete-multiple-${ESAutocompleteMultipleComponent.nextId++}`;
  @HostBinding('style.display') public styleDisplay = 'block';
  @HostBinding('style.width') public styleWidth = '100%';

  @ViewChild('input', { static: false }) private input?: ElementRef<HTMLInputElement>;
  @ViewChild('arrow', { static: true }) private arrow?: MatButton;
  @ViewChild('selectionList', { static: false }) private selectionList?: MatSelectionList;

  @Input() public service!: (search: string) => Observable<any[]>;

  @Input() public displayWith!: (option: any) => string;

  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder = '';

  @Input()
  public get required() {
    return this._required;
  }
  public set required(required) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }
  private _required = false;

  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }
  private _disabled = false;

  @Input() public showedOptionsCount = 50;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  public origin!: CdkOverlayOrigin;
  public describedBy = '';

  private destoryed$ = new Subject<void>();
  public stateChanges = new Subject<void>();

  public value: any[] = [];

  public isOpen = false;
  public width = 0;
  public options$: Observable<any[]>;

  public text = '';
  public text$ = new BehaviorSubject('');

  public focused = false;

  private count = 0;

  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return !!(control.invalid && (control.touched || form?.submitted));
    }

    return false;
  }

  public get empty() {
    return !this.value.length;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() public ngForm: FormGroupDirective,
    @Optional() @Host() private matFormField: MatFormField,
    private changeDetectorRef: ChangeDetectorRef,
    private focusMonitor: FocusMonitor,
    /**
     * @internal
     */
    public localeService: ESLocaleService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this as any;
    }

    this.options$ = this.text$.pipe(
      debounceTime(400),
      switchMap((text) => this.service(text).pipe(catchError(() => of([])))),
      shareReplay(1)
    );

    this.options$.pipe(takeUntil(this.destoryed$)).subscribe();

    this.locale$ = this.localeService.locale();
  }

  public ngOnInit() {
    if (this.matFormField) {
      this.origin = {
        elementRef: this.matFormField.getConnectedOverlayOrigin()
      };
    }

    this.stateChanges.subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  public ngOnDestroy() {
    this.destoryed$.next();
    this.destoryed$.complete();
    this.stateChanges.complete();
  }

  public setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  public onContainerClick() {
    this.isOpen = true;
    if (this.matFormField) {
      this.width = this.matFormField._elementRef.nativeElement.clientWidth;
    }
    this.stateChanges.next();

    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    });
  }

  public writeValue(value: any[]) {
    if (value !== undefined) {
      this.value = value;
      this.stateChanges.next();
    }
  }

  public registerOnChange(onChange: (value: any) => void) {
    this.onChange = onChange;
  }

  public onChange = (_: any[]) => {};

  public registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched;
  }

  public onTouched = () => {};

  public onClose(shouldFocusArrow?: boolean) {
    this.onTouched();
    this.isOpen = false;

    this.text = '';
    this.text$.next('');

    if (shouldFocusArrow && this.arrow) {
      this.focusMonitor.focusVia(this.arrow._elementRef.nativeElement, 'keyboard');
    }

    this.stateChanges.next();
  }

  public onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.text = value;
    this.text$.next(value);
  }

  public onClear() {
    this.text = '';
    this.text$.next('');
  }

  public onSelectionChange(event: MatSelectionListChange) {
    const newValue = this.value.slice();
    const option = event.option.value;

    const index = newValue.findIndex((o) => o.id === option.id);
    if (index !== -1) {
      newValue.splice(index, 1);
    } else {
      newValue.push(option);
    }

    this.value = newValue;
    this.onChange(newValue);
    this.stateChanges.next();
  }

  public onSelectAll() {
    this.selectionList?.options.forEach((option: MatListOption) => {
      if (!option.selected) {
        option._setSelected(true);

        this.onSelectionChange({ option } as MatSelectionListChange);
      }
    });
  }

  public onDeSelectAll() {
    this.selectionList?.options.forEach((option: MatListOption) => {
      if (option.selected) {
        option._setSelected(false);

        this.onSelectionChange({ option } as MatSelectionListChange);
      }
    });
  }

  public isSelected(option: any) {
    return !!this.value.find((o) => o.id === option.id);
  }

  public getShownCountInfo(labelShown: string, labelOf: string) {
    const count = this.count - this.showedOptionsCount > 0 ? this.showedOptionsCount : this.count;

    return `${labelShown}: ${count} ${labelOf} ${this.count}`;
  }
}
