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
  ElementRef,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgControl
} from '@angular/forms';

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';

import { MatButton } from '@angular/material/button';
import { MatChipList } from '@angular/material/chips';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';

import { Observable, Subject, combineLatest, of, BehaviorSubject } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  takeUntil
} from 'rxjs/operators';

import { resizeObserver } from '../../utils/resize-observer';
import { ESLocale, ESLocaleService } from '../locale';

import { ES_AUTOCOMPLETE_ANIMATIONS } from './autocomplete-multiple.animations';
import { ESAutocompleteMultipleSearchScope } from '.';

const CHIP_LEFT_MARGIN = 4;
const COUNT_WIDTH = 40;
const MIN_PANEL_WIDTH = 320;

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
  implements MatFormFieldControl<any[]>, ControlValueAccessor, OnInit, OnDestroy, AfterViewInit {
  private static nextId = 0;
  @HostBinding() public id = `es-autocomplete-multiple-${ESAutocompleteMultipleComponent.nextId++}`;
  @HostBinding('style.display') public styleDisplay = 'block';
  @HostBinding('style.width') public styleWidth = '100%';

  @ViewChild('input', { static: false }) private input?: ElementRef<HTMLInputElement>;
  @ViewChild('arrow', { static: true }) private arrow?: MatButton;
  @ViewChild('selectionList', { static: false }) private selectionList?: MatSelectionList;
  @ViewChild('chipList', { static: false }) private chipList?: MatChipList;

  /** Search options service. When passing the second parameter **options**, the search is performed in this selection. */
  @Input() public service!: (search: string, options?: any[]) => Observable<any[]>;

  /** Function that maps an option control value to its display value in the trigger. */
  @Input() public displayWith!: (option: any) => string;

  /** Placeholder for search input */
  @Input()
  public get placeholder() {
    return this._placeholder;
  }
  public set placeholder(placeholder) {
    this._placeholder = placeholder;
    this.stateChanges.next();
  }
  private _placeholder = '';

  /** Whether the control is required. */
  @Input()
  public get required() {
    return this._required;
  }
  public set required(required) {
    this._required = coerceBooleanProperty(required);
    this.stateChanges.next();
  }
  private _required = false;

  /** Whether the control is disabled. */
  @Input()
  public get disabled() {
    return this._disabled;
  }
  public set disabled(disabled) {
    this._disabled = coerceBooleanProperty(disabled);
    this.stateChanges.next();
  }
  private _disabled = false;

  /** The number of displayed options in the list. By default, all options displayed */
  @Input() public showedOptionsCount = null;

  /**
   * @internal
   * @ignore
   */
  public locale$: Observable<ESLocale>;

  /**
   * @internal
   * @ignore
   */
  public origin!: CdkOverlayOrigin;

  /**
   * @internal
   * @ignore
   */
  public describedBy = '';

  /**
   * @internal
   * @ignore
   */
  private destoryed$ = new Subject<void>();

  /**
   * @internal
   * @ignore
   */
  public stateChanges = new Subject<void>();

  /**
   * @internal
   * @ignore
   */
  public value: any[] = [];

  /**
   * @internal
   * @ignore
   */
  public isOpen = false;

  /**
   * @internal
   * @ignore
   */
  public width = 0;

  /**
   * @internal
   * @ignore
   */
  public selectionChanged$ = new BehaviorSubject(null);

  /**
   * @internal
   * @ignore
   */
  public options$: Observable<any[]>;

  /**
   * @internal
   * @ignore
   */
  public filteredOptions$: Observable<any[]>;

  /**
   * @internal
   * @ignore
   */
  public focused = false;

  /**
   * @internal
   * @ignore
   */
  public searchScope = ESAutocompleteMultipleSearchScope;

  /**
   * @internal
   * @ignore
   */
  public form = new FormGroup({
    scope: new FormControl(this.searchScope.ALL),
    text: new FormControl('')
  });

  /**
   * @internal
   * @ignore
   */
  public hiddenChipCount = 0;

  /**
   * @internal
   * @ignore
   */
  private count = 0;

  /**
   * @internal
   * @ignore
   */
  @HostBinding('class.floating')
  public get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  /**
   * @internal
   * @ignore
   */
  public get errorState(): boolean {
    const control = this.ngControl;
    const form = this.ngForm;

    if (control) {
      return !!(control.invalid && (control.touched || form?.submitted));
    }

    return false;
  }

  /**
   * @internal
   * @ignore
   */
  public get empty() {
    return !this.value.length;
  }

  /**
   * @ignore
   */
  constructor(
    /**
     * @internal
     */
    @Optional() @Self() public ngControl: NgControl,
    /**
     * @internal
     */
    @Optional() public ngForm: FormGroupDirective,
    /**
     * @internal
     */
    @Optional() @Host() private matFormField: MatFormField,
    /**
     * @internal
     */
    private changeDetectorRef: ChangeDetectorRef,
    /**
     * @internal
     */
    private focusMonitor: FocusMonitor,
    /**
     * @internal
     */
    private rendered2: Renderer2,
    /**
     * @internal
     */
    private elementRef: ElementRef,
    /**
     * @internal
     */
    public localeService: ESLocaleService
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this as any;
    }
    this.locale$ = this.localeService.locale();

    this.options$ = this.form.valueChanges.pipe(
      startWith({ scope: this.searchScope.ALL, text: '' }),
      debounceTime(400),
      switchMap(({ scope, text }) => {
        if (scope === this.searchScope.SELECTED) {
          return this.service(text, this.value).pipe(catchError(() => of([])));
        }

        return this.service(text).pipe(catchError(() => of([])));
      }),
      shareReplay(1)
    );

    this.filteredOptions$ = combineLatest([
      this.options$,
      this.selectionChanged$.pipe(filter(() => this.isOpen))
    ]).pipe(
      debounceTime(100),
      map(([options]) => {
        const { scope } = this.form.value;

        if (scope === this.searchScope.SELECTED) {
          return options.filter((option) => this.value.some((o) => o.id === option.id));
        } else if (scope === this.searchScope.NOT_SELECTED) {
          return options.filter((option) => !this.value.some((o) => o.id === option.id));
        } else {
          return options;
        }
      }),
      map((options) => {
        this.count = options.length;

        if (this.showedOptionsCount) {
          return this.showedOptionsCount > options.length
            ? options
            : options.slice(0, this.showedOptionsCount - 1);
        } else {
          return options;
        }
      })
    );
  }

  /**
   * @internal
   * @ignore
   */
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

  /**
   * @internal
   * @ignore
   */
  public ngAfterViewInit() {
    combineLatest([
      // tslint:disable-next-line:deprecation
      resizeObserver(this.elementRef.nativeElement).pipe(startWith(null), debounceTime(10)),
      this.selectionChanged$
    ])
      .pipe(takeUntil(this.destoryed$))
      .subscribe(() => {
        this.updateDisplayedChips();
      });
  }

  /**
   * @internal
   * @ignore
   */
  public ngOnDestroy() {
    this.destoryed$.next();
    this.destoryed$.complete();
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
  public onContainerClick() {
    if (this.ngControl.disabled || this.disabled) {
      return;
    }

    this.isOpen = true;
    if (this.matFormField) {
      const width = this.matFormField._elementRef.nativeElement.clientWidth;

      this.width = width < MIN_PANEL_WIDTH ? MIN_PANEL_WIDTH : width;
    }
    this.stateChanges.next();

    setTimeout(() => {
      if (this.input) {
        this.input.nativeElement.focus();
      }
    });
  }

  /**
   * @internal
   * @ignore
   */
  public writeValue(value: any[]) {
    if (value !== undefined) {
      this.value = value;
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
  public onChange = (_: any[]) => {};

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
  public onClose(shouldFocusArrow?: boolean) {
    this.onTouched();
    this.isOpen = false;
    this.form.patchValue({ text: '', scope: this.searchScope.ALL });

    if (shouldFocusArrow && this.arrow) {
      this.focusMonitor.focusVia(this.arrow._elementRef.nativeElement, 'keyboard');
    }

    this.stateChanges.next();
  }

  /**
   * @internal
   * @ignore
   */
  public onClear() {
    this.form.patchValue({ text: '' });
  }

  /**
   * @internal
   * @ignore
   */
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
    this.changeState(this.value);
  }

  /**
   * @internal
   * @ignore
   */
  public onSelectAll() {
    const newValue = this.value.slice();

    this.selectionList.options.forEach((option) => {
      const index = newValue.findIndex((o) => o.id === option.value.id);

      if (index === -1) {
        newValue.push(option.value);
      }
    });

    this.value = newValue;
    this.changeState(this.value);
  }

  /**
   * @internal
   * @ignore
   */
  public onDeSelectAll() {
    if (this.value.length) {
      const newValue = this.value.slice();

      this.selectionList.options.forEach((option) => {
        const index = newValue.findIndex((o) => o.id === option.value.id);

        if (index !== -1) {
          newValue.splice(index, 1);
        }
      });

      this.value = newValue;
      this.changeState(this.value);
    }
  }

  /**
   * @internal
   * @ignore
   */
  public onRemoveAll(event?: Event) {
    event.stopPropagation();

    this.value = [];
    this.changeState(this.value);
  }

  /**
   * @internal
   * @ignore
   */
  public onRemove(index: number) {
    this.value.splice(index, 1);
    this.changeState(this.value);
  }

  /**
   * @internal
   * @ignore
   */
  public onShowSelectedTab() {
    this.form.patchValue({ scope: this.searchScope.SELECTED });
  }

  /**
   * @internal
   * @ignore
   */
  public isSelected(option: any) {
    return !!this.value.find((o) => o.id === option.id);
  }

  /**
   * @internal
   * @ignore
   */
  public getShownCountInfo(labelShown: string, labelOf: string) {
    let count = 0;

    if (this.showedOptionsCount) {
      count = this.count - this.showedOptionsCount > 0 ? this.showedOptionsCount : this.count;
    } else {
      count = this.count;
    }

    return `${labelShown}: ${count} ${labelOf} ${this.count}`;
  }

  /**
   * @internal
   * @ignore
   */
  public updateDisplayedChips() {
    if (this.chipList) {
      let count = 0;

      const chips = this.chipList.chips;

      let isOverflow = false;
      let offset = 0;

      chips.forEach((chip, index) => {
        this.rendered2.setStyle(chip._elementRef.nativeElement, 'display', 'inline-flex');
        this.rendered2.setStyle(chip._elementRef.nativeElement, 'width', 'auto');

        const {
          width: chipListWidth
        } = chip._elementRef.nativeElement.parentElement.getBoundingClientRect();

        const { width: chipWidth } = chip._elementRef.nativeElement.getBoundingClientRect();

        offset += chipWidth;

        if (isOverflow) {
          count += 1;

          this.rendered2.setStyle(chip._elementRef.nativeElement, 'display', 'none');
        } else if (chips.length === 1 && chipWidth > chipListWidth) {
          this.rendered2.setStyle(chip._elementRef.nativeElement, 'width', `${chipListWidth}px`);
        } else if (chips.length === 1) {
          this.rendered2.setStyle(chip._elementRef.nativeElement, 'width', 'auto');
        } else {
          if (offset <= chipListWidth && index === chips.length - 1) {
            return;
          } else if (offset > chipListWidth - COUNT_WIDTH && index) {
            count += 1;

            isOverflow = true;

            this.rendered2.setStyle(chip._elementRef.nativeElement, 'display', 'none');
          } else {
            const width =
              chipWidth + COUNT_WIDTH > chipListWidth ? chipListWidth - COUNT_WIDTH : chipWidth;

            this.rendered2.setStyle(chip._elementRef.nativeElement, 'width', `${width}px`);
          }
        }

        offset += CHIP_LEFT_MARGIN;
      });

      if (this.hiddenChipCount !== count) {
        this.hiddenChipCount = count;
        this.stateChanges.next();
      }
    }
  }

  /**
   * @internal
   * @ignore
   */
  private changeState(value: any[]) {
    this.onChange(value);
    this.stateChanges.next();
    this.selectionChanged$.next(true);
  }
}
