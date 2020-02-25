import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { GetFilterOptions } from '../../filter-options';

const OPTIONS = ['Winter', 'Spring', 'Summer', 'Autumn'];

@Component({
  selector: 'es-autocomplete-story-ng-model',
  templateUrl: './autocomplete-story-ng-model.component.html',
  styleUrls: ['./autocomplete-story-ng-model.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AutocompleteStoryNgModelComponent {
  public options: any[] = OPTIONS;
  public text = '';

  public onChangeText(text: string) {
    this.options = GetFilterOptions(text, OPTIONS);
  }
}
