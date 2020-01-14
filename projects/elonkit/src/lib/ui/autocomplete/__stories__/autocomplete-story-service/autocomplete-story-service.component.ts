import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GetFilterOptions } from '../../filter-options';
import { AutocompleteService } from '../autocomplete-story-service/autocomplete.service';

const DEBOUNCE = 500;

@Component({
  selector: 'es-autocomplete-story-service',
  templateUrl: './autocomplete-story-service.component.html',
  styleUrls: ['./autocomplete-story-service.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryServiceComponent implements OnInit {
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
  }

  public ngOnInit() {
    this.isLoading = true;
    this.autocompleteService.getOptions().subscribe(options => {
      this.optionsFromService = options.OPTIONS;
      this.options = this.optionsFromService;
      this.isLoading = false;
      this.changeDetector.detectChanges();
    });
  }

  public onChangeText(text: string) {
    this.options = this.optionsFromService;
    this.options = GetFilterOptions(text, this.options);
  }
}
