import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AutocompleteService } from '../autocomplete-story-service/autocomplete.service';

import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'es-autocomplete-story-service',
  templateUrl: './autocomplete-story-service.component.html',
  styleUrls: ['./autocomplete-story-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryServiceComponent implements OnDestroy {
  text$ = new BehaviorSubject<string>('');

  public form: FormGroup;
  public options: string[];
  public isLoading = false;
  private subscription: Subscription | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private autocompleteService: AutocompleteService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      autocomplete: ['']
    });

    this.subscription = this.text$
      .pipe(
        tap(() => {
          this.isLoading = true;
        }),
        switchMap(text => this.autocompleteService.getOptions(text))
      )
      .subscribe(options => {
        this.options = options.options;
        this.isLoading = false;
        this.changeDetector.detectChanges();
      });
  }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  public onChangeText(text: string) {
    this.text$.next(text);
  }
}
