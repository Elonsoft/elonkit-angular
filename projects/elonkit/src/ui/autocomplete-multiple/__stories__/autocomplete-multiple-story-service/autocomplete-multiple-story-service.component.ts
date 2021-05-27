import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { of } from 'rxjs';

import { AutocompleteMultipleStoryService } from './autocomplete-multiple-story-service.service';

@Component({
  selector: 'es-autocomplete-multiple-story-service',
  styleUrls: ['./autocomplete-multiple-story-service.component.scss'],
  encapsulation: ViewEncapsulation.None,
  template: `
    <form class="es-autocomplete-multiple-story-service" [formGroup]="form">
      <mat-form-field
        appearance="outline"
        class="es-autocomplete-multiple-story-service__field"
        [ngStyle]="{ 'width.px': width }"
      >
        <mat-label>Country</mat-label>

        <es-autocomplete-multiple
          formControlName="autocomplete"
          [service]="searchService"
          [required]="required"
          [disabled]="disabled"
          [showedOptionsCount]="showedOptionsCount"
          [displayWith]="displayWith"
        ></es-autocomplete-multiple>
      </mat-form-field>
    </form>
  `
})
export class AutocompleteMultipleStoryServiceComponent {
  @Input() public width: number;

  @Input() public showedOptionsCount: number;

  @Input() public required: boolean;

  @Input() public disabled: boolean;

  public form: FormGroup;

  constructor(private service: AutocompleteMultipleStoryService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      autocomplete: [
        [
          { id: 3, name: 'Norway' },
          { id: 9, name: 'Portugal' },
          { id: 10, name: 'Russia' }
        ]
      ]
    });
  }

  public searchService = (text: string, options?: any[]) => {
    const lowerText = text ? text.toLowerCase() : '';

    return options
      ? of(options.filter((option) => option.name.toLowerCase().includes(lowerText)))
      : this.service.getOptions(lowerText);
  };

  public displayWith = (value: { id: number; name: string }) => value.name;
}
