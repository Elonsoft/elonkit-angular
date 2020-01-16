import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutocompleteService } from '../autocomplete-story-service/autocomplete.service';

import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';

const DEBOUNCE = 500;

@Component({
  selector: 'es-autocomplete-story-service',
  templateUrl: './autocomplete-story-service.component.html',
  styleUrls: ['./autocomplete-story-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryServiceComponent implements OnInit, OnDestroy {
  text$ = new BehaviorSubject<string>('');

  public form: FormGroup;
  public options: string[];
  public isLoading = false;
  public optionsFromService: string[];
  public debounceTime: number = DEBOUNCE;

  constructor(
    private formBuilder: FormBuilder,
    private autocompleteService: AutocompleteService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });

    this.text$
      .pipe(
        untilComponentDestroyed(this),
        switchMap(text => this.autocompleteService.getOptions(text))
      )
      .subscribe(options => {
        this.options = options.options;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      });
  }

  public ngOnInit() {
    this.loadingOptions();
  }

  public ngOnDestroy() {
    //
  }

  public onChangeText(text: string) {
    this.loadingOptions(text);
  }

  public loadingOptions(text?: string) {
    this.isLoading = true;
    this.text$.next(text);
  }
}
